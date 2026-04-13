export async function POST(req) {
  try {
    const body = await req.json();
    const { image } = body;

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "fb8af171cfa1616f77c2c5d7f9d7b0f7b3a3d8d5a8e6a7e3b3b1c1d1e1f1a1a1",
        input: {
          image: image
        }
      })
    });

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
