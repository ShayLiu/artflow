import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.ZHIPU_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ZHIPU_API_KEY 未配置" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === "enhance") {
      return handleEnhance(apiKey, body.prompt);
    }

    return handleGenerate(apiKey, body);
  } catch (err: any) {
    console.error("AI edit error:", err);
    return NextResponse.json(
      { error: err.message || "服务器内部错误" },
      { status: 500 }
    );
  }
}

async function handleEnhance(apiKey: string, prompt: string) {
  const response = await fetch(
    "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages: [
          {
            role: "system",
            content: `你是一个专业的AI绘画提示词优化师。用户会给你一个简短的图片描述，你需要将它扩展为一个详细、专业的绘画提示词。

规则：
- 保留用户的核心意图
- 添加画面构图、光影、色彩、氛围等细节
- 添加质量相关的描述词
- 用中文输出
- 直接输出优化后的提示词，不要解释
- 控制在100字以内`,
          },
          { role: "user", content: prompt },
        ],
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Prompt 优化失败" },
      { status: 500 }
    );
  }

  const data = await response.json();
  const enhancedPrompt = data.choices?.[0]?.message?.content?.trim();

  return NextResponse.json({ enhancedPrompt: enhancedPrompt || prompt });
}

async function handleGenerate(
  apiKey: string,
  body: { image?: string; prompt: string; size?: string }
) {
  const { image, prompt, size = "1024x1024" } = body;

  if (!prompt) {
    return NextResponse.json({ error: "缺少描述" }, { status: 400 });
  }

  const reqBody: Record<string, string> = {
    model: "cogview-4",
    prompt,
    size,
  };

  if (image) {
    reqBody.image_url = `data:image/png;base64,${image}`;
  }

  const response = await fetch(
    "https://open.bigmodel.cn/api/paas/v4/images/generations",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    console.error("ZhipuAI API error:", errorData);
    return NextResponse.json(
      { error: `智谱AI 返回错误: ${response.status}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  const imageUrl = data?.data?.[0]?.url;

  if (!imageUrl) {
    return NextResponse.json(
      { error: "AI 未返回有效图片" },
      { status: 500 }
    );
  }

  return NextResponse.json({ imageUrl });
}
