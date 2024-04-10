const baseUrl: string = "http://127.0.0.1:7860/sdapi/v1"

export async function generateImage(prompt: string, negativePrompt: string, steps: number, height: number, width: number): Promise<Response> {
    const res = await fetch(`${baseUrl}/txt2img`, {
        method: "POST",
        body: JSON.stringify({
            "prompt": prompt,
            "negative_prompt": `nsfw, ${negativePrompt}`,
            "steps": steps,
            "height": height,
            "width": width
        })
    })
    return res
}