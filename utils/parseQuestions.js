export const parseQuestions = (rawText, meta) => {
    // Split by 'Question' followed by number and optional markers
    const questionBlocks = rawText.split(/Question\s+\d+\s*[\*\-\_]*\s*/i).filter(function (x) {
        return x && x.trim() !== "";
    });

    const questions = [];

    questionBlocks.forEach(function (block, index) {
        // Trim leading/trailing whitespace
        const text = block.trim();

        // Split into lines for processing
        const lines = text.split('\n').map(function (line) {
            return line.trim();
        }).filter(function (line) {
            return line !== '';
        });

        // Initialize question object with meta data
        const question = {
            subject: meta && meta.subject ? meta.subject : "",
            difficulty: meta && meta.difficulty ? meta.difficulty : "medium",
            questionNumber: index + 1,
            question: "",
            options: [],
            answer: "",
            type: "short_answer" // default type
        };

        // Find the first line that indicates options or answer
        let optionsStartIndex = -1;
        let answerStartIndex = -1;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Check for options (a), b), etc.)
            if (/^[a-d]\)/i.test(line)) {
                optionsStartIndex = i;
                break;
            }
            // Check for true/false options
            else if (/^(true|false)\b/i.test(line) && i < lines.length - 1 && /^(true|false)\b/i.test(lines[i + 1])) {
                optionsStartIndex = i;
                break;
            }
            // Check for answer marker
            else if (line.toLowerCase().startsWith('answer:')) {
                answerStartIndex = i;
                break;
            }
        }

        // Determine question type based on content
        if (optionsStartIndex !== -1) {
            // Multiple choice or true/false question
            question.question = lines.slice(0, optionsStartIndex).join(' ');

            // Process options
            const optionsLines = lines.slice(optionsStartIndex);

            // Check if this is a true/false question
            const isTrueFalse = optionsLines.length >= 2 &&
                /^(true|false)\b/i.test(optionsLines[0]) &&
                /^(true|false)\b/i.test(optionsLines[1]);

            if (isTrueFalse) {
                question.type = "true_false";
                question.options = optionsLines.slice(0, 2).map(function (opt) {
                    return opt.trim();
                });
            } else {
                question.type = "mcq";
                // Extract options (a), b), etc.)
                for (let i = 0; i < optionsLines.length; i++) {
                    const optionMatch = optionsLines[i].match(/^([a-d])\)\s*(.+)/i);
                    if (optionMatch) {
                        question.options.push(optionMatch[2].trim());
                    } else {
                        break; // stop at first non-option line
                    }
                }
            }

            // Find answer (could be after options or at the end)
            const answerSearchStart = isTrueFalse ? optionsStartIndex + 2 : optionsStartIndex + question.options.length;
            for (let i = answerSearchStart; i < lines.length; i++) {
                if (lines[i].toLowerCase().startsWith('answer:')) {
                    question.answer = lines[i].slice(7).trim();
                    // Include subsequent lines if they're part of the answer
                    if (i + 1 < lines.length && !/^[a-d]\)/i.test(lines[i + 1])) {
                        question.answer += " " + lines.slice(i + 1).join(' ').trim();
                    }
                    break;
                }
            }
        } else {
            // Short answer or long answer question
            question.question = answerStartIndex !== -1 ?
                lines.slice(0, answerStartIndex).join(' ') :
                lines.join(' '); // if no answer marker, treat all as question

            // Determine if this is short or long answer based on length
            const answerContent = answerStartIndex !== -1 ?
                lines.slice(answerStartIndex).join(' ') :
                "";

            if (answerStartIndex !== -1) {
                question.answer = lines[answerStartIndex].slice(7).trim();
                if (answerStartIndex + 1 < lines.length) {
                    question.answer += " " + lines.slice(answerStartIndex + 1).join(' ').trim();
                }
            }

            // Classify as short or long answer based on answer length
            question.type = question.answer.length > 50 ? "long_answer" : "short_answer";
        }

        // Only add if we have both question and answer
        if (question.question && question.answer) {
            questions.push(question);
        }
    });

    return questions;
};