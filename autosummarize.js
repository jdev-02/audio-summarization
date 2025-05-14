import { AssemblyAI } from 'assemblyai' // Import AssemblyAI module
import fs from 'fs' // Import fs (file system) module

// Create a new AssemblyAI client with the provided API key
const client = new AssemblyAI({
  apiKey: "a36bd4e4cc9348a48ccc4bd5b6341304"
})

// Define an asynchronous function to run the transcription process
const run = async () => {
  try {
    // Define the local file path to the audio file
    const filePath = "C:\\Users\\YourName\\Downloads\\example.mp3"
    
    console.log("Uploading file to AssemblyAI...") // Log message indicating file upload
    // Upload the local audio file to AssemblyAI and get the upload URL
    const uploadUrl = await client.files.upload(filePath)
    console.log("File uploaded successfully, URL:", uploadUrl) // Log the upload URL
    
    // Determine the audio URL from the upload response
    const audioUrl = typeof uploadUrl === 'string' ? uploadUrl : 
                    (uploadUrl && uploadUrl.upload_url ? uploadUrl.upload_url : null)
    
    // Throw an error if a valid upload URL is not obtained
    if (!audioUrl) {
      throw new Error("Failed to get a valid upload URL")
    }
    
    console.log("Using audio URL:", audioUrl) // Log the audio URL
    console.log("Submitting transcription request...") // Log message indicating transcription request
    
    // Submit the transcription request to AssemblyAI
    const transcript = await client.transcripts.transcribe({
      audio_url: audioUrl, // Provide the audio URL
      punctuate: true, // Enable punctuation in the transcription
      format_text: true // Enable text formatting in the transcription
    })
    
    // Check for errors in the transcription response
    if (transcript.status === "error") { 
      console.error("Transcription error:", transcript.error) // Log the transcription error
      throw new Error(transcript.error) // Throw an error with the transcription error message
    }
    
    // Initialize the completed transcript with the initial transcript response
    let completedTranscript = transcript
    // Poll until the transcription status is "completed" or "error"
    while (completedTranscript.status !== "completed" && completedTranscript.status !== "error") {
      console.log(`Transcription status: ${completedTranscript.status}. Waiting...`) // Log the current transcription status
      await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds
      completedTranscript = await client.transcripts.get(transcript.id) // Get the updated transcript status
    }
    
    // Throw an error if the final transcription status is "error"
    if (completedTranscript.status === "error") {
      throw new Error(completedTranscript.error)
    }
    
    console.log("Transcription complete!") // Log message indicating transcription completion
    // Log an excerpt of the completed transcript
    console.log("Transcript excerpt:", completedTranscript.text?.substring(0, 100) + "...")
    
    // Save the full transcript to a file
    fs.writeFileSync('transcript.txt', completedTranscript.text)
    console.log("Full transcript saved to transcript.txt") // Log message indicating transcript saved
    
    // Log instructions for summarizing the transcript with another AI service
    console.log("\nSince your account doesn't have access to LeMUR for summarization,")
    console.log("you can now use the transcript.txt file with another AI service")
    console.log("such as OpenAI's API, Claude API, or even a web interface like ChatGPT to generate a summary.")
    
    // Example instructions for next steps
    console.log("\nTo summarize with another service like ChatGPT or Claude:")
    console.log("1. Open transcript.txt")
    console.log("2. Copy the content")
    console.log("3. Use a prompt like: 'Please summarize this transcript into main points, with the length of about 2 pages in 12 point font format. This is a lecture about Vietnam from grad school.'")
  } catch (error) {
    console.error("An error occurred:", error.message) // Log any errors that occur
    // If there's an HTTP error, log more details
    if (error.response) {
      console.error("Status:", error.response.status) // Log the HTTP status code
      console.error("Data:", error.response.data) // Log the HTTP response data
    }
  }
}

// Run the transcription process
run()
