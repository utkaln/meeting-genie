import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  const animal = req.body.animal || "";
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Did you forget to Enter your question !",
      },
    });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL,
      messages: generatePrompt(animal),
      temperature: 0.2,
    });
    console.log(completion.choices[0].message);
    res.status(200).json({ result: completion.choices[0].message });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  const msgArr = [
    {
      role: "system",
      content:
        "Assume the role of a Software project manager who is really good at project planning and understands Agile methodologies of software development",
    },
    { role: "user", content: "find the critical path to deliver this project" },
    {
      role: "assistant",
      content:
        "We need to identify the effort required for tasks and dependencies among tasks to sequence the work",
    },
    { role: "user", content: "How much of staffing or resources do we need ?" },
    {
      role: "assistant",
      content:
        "Once each task is broken down to code modules, we can identify the number of resources who can work in parallel on the software code",
    },
    { role: "user", content: "Should we choose Node or Java for the code?" },
    {
      role: "assistant",
      content:
        "We should ask the architects for input, however from project management perspective I can say Node projects develop faster",
    },
    {
      role: "user",
      content: "How can we ensure we do not have long pending dependencies ?",
    },
    {
      role: "assistant",
      content:
        "We will have to articulate the business value to the leadership team and show the potential cost savings by installing this software. This would give the senior leadership a sense of priority and criticality of the project ",
    },
    { role: "user", content: capitalizedAnimal },
  ];

  return msgArr;
}
