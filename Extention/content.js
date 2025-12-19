

function getEmailContent() {
    const selectors = [
        '.a3s.aiL',          // main email body
        '.gmail_quote',      // quoted replies
    ];

    let fullText = '';

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            const text = el.innerText?.trim();
            if (text && !fullText.includes(text)) {
                fullText += text + '\n\n';
            }
        });
    });

    return fullText.trim();
}



function findMailComposeToolbar(){
    const Selectors = [
        '.btC', '.aDh', '[role = "toolbar"]', '.gU.Up'
    ]
    for (const Selector of Selectors) {
        const Toolbar = document.querySelector(Selector);

        if (Toolbar) {
            return Toolbar;
        }
    }
    return null;
}

function CreateAIButton(){
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.style.borderRadius = '25px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function InjectButtonInMail(){

    const ExistButton = document.querySelector('.ai_reply_btn');
    if (ExistButton) {
        ExistButton.remove();
    }

    const Toolbar = findMailComposeToolbar();

    if (!Toolbar) {
        console.log("Toolbar Not Found in Email Window");
        return;
    }

    const Button = CreateAIButton();
    Button.classList.add('ai_reply_btn')

    Button.addEventListener('click', async () => {
        try {
            Button.innerHTML = 'Generating...';
            Button.disabled = true;

            const EmailContent = getEmailContent();

            const response = await fetch('http://localhost:8080/email/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    emailContent: EmailContent,
                    tone: "professional"
                })
            })

            if (!response.ok) {
                throw new Error("API Request Failed!");
                
            }

            const generatedReply = await response.text();

            const composeBox = document.querySelector(
                '[role="textbox"][g_editable="true"]'
            );
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            }
        } catch (error) {
            
        }finally{
            Button.innerHTML = 'AI Reply';
            Button.disabled = false;
        }
    })

    Toolbar.insertBefore(Button, Toolbar.firstChild)
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const ComposeElement = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]')
            || node.querySelector?.('.aDh, .btC, [role="dialog"]')
        )
        )
        if (ComposeElement) {
            console.log("Email Compose Window Detected...");
            setTimeout(InjectButtonInMail,1000)
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
})