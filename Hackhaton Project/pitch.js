
                
//       const API_KEY = "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"; 


// document.getElementById("btn").addEventListener("click", async function (e) {
//         e.preventDefault()
//       const name = document.getElementById("name").value.trim();
//       const email = document.getElementById("email").value.trim();
//       const idea = document.getElementById("idea").value.trim();
//       const res = document.getElementById("res");
    
    
//         res.innerHTML = "<p>Generating...</p>";
    
    
    
//       if (!idea) {
//             res.innerHTML = "  <p>Please enter your idea first. </p>";
        
//             return;
//           }
        
        
        
        
//           try {
//                 const prompt = `
//                   You are a startup pitch generator.
//                   Based on this idea: "${idea}".
//                   Name: ${name}.
//                   Email: ${email}.
//                   Generate:
//                   1. Startup Name
//       2. Tagline
//       3. Elevator Pitch (2–3 lines)
//       4. Target Audience
//     `;

//     const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${Api_KEY} ",
//       {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                   contents: [{ parts: [{ text: prompt }] }],
//                 }),
//               }
//             );
        
//             const data = await response.json();
//             const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
//             res.innerHTML = `<pre>${aiText}</pre>`;
//           } catch (error) {
//                 console.error(error);
//                 res.innerHTML = "<p >⚠️ Error generating pitch. Check API key or console.</p>";
//               }
//             });
            
            
           


import { db, collection, addDoc, getDocs } from "./firebase.js";

    const nameInput = document.getElementById("name");
    const descInput = document.getElementById("desc");
    const industrySelect = document.getElementById("industry");
    const infoBox = document.getElementById("info");
    const output = document.getElementById("output");
    const notifyBox = document.getElementById("notify");


    function notify(message, type = "success") {
      notifyBox.textContent = message;
      notifyBox.className = `notify ${type} show`;
      setTimeout(() => (notifyBox.className = "notify"), 3000);
    }


    const industryData = {
      tech: "💻 Tech: Software, AI, and digital innovation driving the world forward.",
      education: "🎓 Education: Smart learning, mentorship, and accessible knowledge.",
      health: "🏥 Health: AI diagnostics, telemedicine, and personalized wellness.",
      finance: "💰 Finance: Fintech, investments, and digital banking transformation.",
      ecommerce: "🛒 E-commerce: Digital marketplaces and next-gen retail experiences.",
      entertainment: "🎬 Entertainment: Creative media, gaming, and immersive content."
    };

    industrySelect.addEventListener("change", e => {
      const val = e.target.value;
      infoBox.style.display = val ? "block" : "none";
      infoBox.textContent = industryData[val] || "";
    });

    // ✅ Typing Animation
    function typeText(el, text, speed = 15) {
      el.innerHTML = "";
      let i = 0;
      const typing = setInterval(() => {
        el.innerHTML += text[i];
        i++;
        if (i >= text.length) clearInterval(typing);
      }, speed);
    }

    function generatePitch(name, desc, industry) {
      const taglines = {
        tech: "Empowering the digital future.",
        education: "Smarter learning for smarter lives.",
        health: "Wellness powered by innovation.",
        finance: "Simplifying the world of money.",
        ecommerce: "Reimagining how the world shops.",
        entertainment: "Where creativity meets experience."
      };
      const tagline = taglines[industry] || "Innovating for a better world.";

      const p1 = `${name} is a forward-thinking startup in the ${industry} industry that ${desc}. By combining innovation with real-world usability, ${name} delivers solutions that connect people and technology seamlessly.`;
      const p2 = `Our mission is to shape the future of ${industry} through creativity, data, and human-centered design. ${name} strives to make every interaction smarter, simpler, and more meaningful.`;

      return { tagline, pitch: `${p1}\n\n${p2}` };
    }

    // ✅ Generate Button
    document.getElementById("generate").addEventListener("click", async () => {
      const name = nameInput.value.trim();
      const desc = descInput.value.trim();
      const ind = industrySelect.value;
      if (!name || !desc || !ind) return notify("Please fill all fields!", "error");

      const data = generatePitch(name, desc, ind);
      const finalPitch = `🎯 ${data.tagline}\n\n${data.pitch}`;
      output.innerHTML = '<p class="typing"></p>';
      typeText(output.querySelector(".typing"), finalPitch, 15);

      try {
        await addDoc(collection(db, "pitches"), {
          name, desc, industry: ind, ...data, time: new Date().toISOString()
        });
        notify("Pitch Generated successfully ✅", "success");
      } catch {
        notify("Error saving pitch ❌", "error");
      }
    });

    // ✅ Show All Button
    document.getElementById("showAll").addEventListener("click", async () => {
      output.innerHTML = "<p>Loading...</p>";
      const snap = await getDocs(collection(db, "pitches"));
      if (snap.empty) return (output.innerHTML = "<p>No saved pitches yet.</p>");
      output.innerHTML = "";
      snap.forEach(d => {
        const x = d.data();
        output.innerHTML += `<div style="margin-bottom:15px;">
          <strong>${x.name}</strong> (${x.industry})<br>
          <em>${x.tagline}</em><br>
          <p>${x.pitch.replace(/\n/g, "<br>")}</p>
          <hr>
        </div>`;
      });
      notify("All saved pitches loaded 📜");
    });