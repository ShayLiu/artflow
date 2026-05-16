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
    const { image, prompt } = await request.json();

    if (!image || !prompt) {
      return NextResponse.json(
        { error: "缺少图片或描述" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://open.bigmodel.cn/api/paas/v4/images/edit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "cogview-4",
          image: image,
          prompt: prompt,
          size: "1024x1024",
        }),
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
  } catch (err: any) {
    console.error("AI edit error:", err);
    return NextResponse.json(
      { error: err.message || "服务器内部错误" },
      { status: 500 }
    );
  }
}
