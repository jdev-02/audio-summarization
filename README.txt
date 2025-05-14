# AutoSummarize - Audio Transcript Tool

## Overview
AutoSummarize is a simple tool that helps you turn audio files (like lectures or interviews) into text. It uses AssemblyAI's transcription service to process your audio file and saves the text as a file on your computer. You can then use another AI tool (like ChatGPT or Claude) to summarize the text.

## What You Need
1. **Node.js**: A free program you can download and install from [nodejs.org](https://nodejs.org).
2. **AssemblyAI API Key**: This is included in the script, so you don’t need to worry about it unless you want to use your own.
3. **An Audio File**: The file you want to transcribe (e.g., `.mp3` or `.wav`).

## How to Use AutoSummarize

### Step 1: Set Up the Project
1. Create a folder on your computer for this tool.
2. Save the script file as `autosummarize.js` in that folder.
3. Place your audio file somewhere on your computer (e.g., in your Downloads folder).

### Step 2: Install the Required Software
1. Open the **Command Prompt** (Windows) or **Terminal** (Mac/Linux).
2. Navigate to the folder where you saved the script. For example:
   ```sh
   cd C:\Users\YourName\audio-summarization
   ```
3. Install the required software by typing:
   ```sh
   npm install assemblyai fs
   ```

### Step 3: Update the Script
1. Open the `autosummarize.js` file in a text editor (like Notepad or VS Code).
2. Find this line:
   ```javascript
   const filePath = "C:\\Users\\jgooh\\Downloads\\example.mp3"
   ```
3. Replace it with the location of your audio file. For example:
   ```javascript
   const filePath = "C:\\Users\\YourName\\Music\\lecture.mp3"
   ```
   *Note*: If you're on Windows, use double backslashes (`\\`) in the file path.

### Step 4: Run the Script
1. In the Command Prompt or Terminal, type:
   ```sh
   node autosummarize.js
   ```
2. The script will:
   - Upload your audio file.
   - Transcribe it into text (this may take a few minutes).
   - Save the text as a file called `transcript.txt` in the same folder.

### Step 5: Summarize the Transcript
1. Open the `transcript.txt` file.
2. Copy the text.
3. Use an AI tool like ChatGPT or Claude to summarize it. For example, you can paste the text into ChatGPT and ask:
   ```
   Please summarize this transcript into main points. This is a lecture about Vietnam from grad school.
   ```

## Troubleshooting
- **File Not Found**: Make sure the file path in the script is correct.
- **No Internet**: Ensure you’re connected to the internet.
- **Audio File Issues**: Check that the audio file isn’t corrupted.

## Notes
- This tool only creates the transcript. You’ll need to use another AI tool for summarization.
- If you want to use your own AssemblyAI API key, replace the one in the script with your key.

Enjoy turning your audio into text with AutoSummarize!