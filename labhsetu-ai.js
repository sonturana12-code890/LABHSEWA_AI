// ============================================
// LABHSETU AI — Dedicated AI Chatbot Engine
// Domain-Restricted Intelligence: welfare schemes and SC enterprise credit
// ============================================

const LabhsetuAI = {
        isOpen: false,
        messages: [],
        isThinking: false,

        // Knowledge base definitions
        knowledgeBase: {
            projectName: "LABHSETU AI",
            projectTagline: "Government scheme discovery for students, workers, women and girls, and persons with disabilities, plus SC enterprise credit",
            coreFeatures: [
                "Audience views for students, work and careers, women and girls, and everyone",
                "Rule matching across 58 listed welfare, education, savings, employment, and support schemes",
                "NSFDC Concessional Credit & Education Loan matching for SC entrepreneurs (SIH26093)",
                "Instant eligibility scoring based on age, disability/caste, state, and income",
                "100% Privacy-First & DPDP Act 2023 compliant (Zero PII or Aadhaar uploads required)",
                "Financial EMI & Moratorium Calculator with amortization schedules",
                "Geo-Spatial Channel Partner Locator with Nearest Capable (NPA) filtering",
                "Wispr Flow AI Voice Navigation & Smart Form Auto-fill",
                "NGO & DIC / SC-ST Hub Camp Mode for bulk beneficiary/entrepreneur evaluation",
                "Real-time Application Tracker with deadline alerts & calendar export"
            ]
        },

        // Suggested starter prompts
        quickSuggestions: [
            "How does LABHSETU AI work?",
            "Which scholarships are available for college students?",
            "Which schemes support girls and women?",
            "What apprenticeship support is available?",
            "How do NSFDC concessional loans work for SC entrepreneurs?",
            "Which scholarships are available for 40%+ disability?",
            "How do I apply for free assistive devices under ADIP?",
            "Which channel partner should I apply through for credit?",
            "What is the interest rate and moratorium on NSFDC loans?",
            "Does LABHSETU AI require my Aadhaar card?"
        ],

        init() {
            this.renderWelcome();
        },

        toggle() {
            this.isOpen = !this.isOpen;
            document.body.classList.toggle('ai-assistant-open', this.isOpen);
            const drawer = document.getElementById('aiDrawer');
            const fab = document.getElementById('aiFloatingBtn');
            const bridge = document.getElementById('pageRelationalBridge');
            if (drawer) {
                drawer.classList.toggle('open', this.isOpen);
                drawer.setAttribute('aria-hidden', String(!this.isOpen));
                drawer.toggleAttribute('inert', !this.isOpen);
                if (this.isOpen) {
                    setTimeout(() => {
                        const input = document.getElementById('aiChatInput');
                        if (input) input.focus();
                    }, 300);
                }
            }
            if (fab) {
                fab.classList.toggle('active', this.isOpen);
                fab.setAttribute('aria-expanded', String(this.isOpen));
            }
            if (bridge) {
                bridge.toggleAttribute('inert', this.isOpen);
                bridge.setAttribute('aria-hidden', String(this.isOpen));
            }
        },

        openWithPrompt(text) {
            if (!this.isOpen) this.toggle();
            const input = document.getElementById('aiChatInput');
            if (input) {
                input.value = text;
                this.handleSend();
            }
        },

        close() {
            this.isOpen = false;
            document.body.classList.remove('ai-assistant-open');
            const drawer = document.getElementById('aiDrawer');
            const fab = document.getElementById('aiFloatingBtn');
            const bridge = document.getElementById('pageRelationalBridge');
            if (drawer) {
                drawer.classList.remove('open');
                drawer.setAttribute('aria-hidden', 'true');
                drawer.setAttribute('inert', '');
            }
            if (fab) {
                fab.classList.remove('active');
                fab.setAttribute('aria-expanded', 'false');
            }
            if (bridge) {
                bridge.removeAttribute('inert');
                bridge.setAttribute('aria-hidden', 'false');
            }
        },

        renderWelcome() {
            const chatBody = document.getElementById('aiChatBody');
            if (!chatBody) return;

            chatBody.innerHTML = `
      <div class="ai-msg ai-msg-assistant animate-in">
        <div class="ai-msg-avatar">✨</div>
        <div class="ai-msg-content">
          <div class="ai-bot-badge">LABHSETU AI Intelligence</div>
          <p><strong>Namaste! 🙏 I am your dedicated LABHSETU AI Assistant.</strong></p>
          <p>I can help you navigate the <strong>58 schemes listed in LABHSETU AI</strong> across student support, work and careers, women and girls, disability welfare, and SC enterprise credit.</p>
          <p style="margin-top:8px;font-size:13px;color:var(--text-muted)">I explain the profile checks and link to official providers. Always confirm current criteria, award values, and application windows with the scheme authority.</p>
        </div>
      </div>

      <div class="ai-quick-suggestions">
        <div class="ai-suggestions-title">💡 Frequently Asked Questions:</div>
        <div class="ai-chips-grid">
          ${this.quickSuggestions.map(q => `
            <button type="button" class="ai-chip" onclick="LabhsetuAI.openWithPrompt('${q.replace(/'/g, "\\'")}')">
              ${q}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  handleSend() {
    const input = document.getElementById('aiChatInput');
    if (!input || !input.value.trim() || this.isThinking) return;

    const userText = input.value.trim();
    input.value = '';

    // Render user message
    this.appendUserMessage(userText);

    // Generate intelligent response
    this.isThinking = true;
    this.showThinkingIndicator();

    setTimeout(() => {
      this.removeThinkingIndicator();
      const responseHtml = this.generateResponse(userText);
      this.appendAssistantMessage(responseHtml);
      this.isThinking = false;
      this.scrollToBottom();
    }, 500 + Math.random() * 300);
  },

  appendUserMessage(text) {
    const chatBody = document.getElementById('aiChatBody');
    if (!chatBody) return;

    const div = document.createElement('div');
    div.className = 'ai-msg ai-msg-user animate-in';
    div.innerHTML = `
      <div class="ai-msg-content">
        <p>${this.escapeHtml(text)}</p>
      </div>
    `;
    chatBody.appendChild(div);
    this.scrollToBottom();
  },

  appendAssistantMessage(html) {
    const chatBody = document.getElementById('aiChatBody');
    if (!chatBody) return;

    const div = document.createElement('div');
    div.className = 'ai-msg ai-msg-assistant animate-in';
    div.innerHTML = `
      <div class="ai-msg-avatar">✨</div>
      <div class="ai-msg-content">
        ${html}
      </div>
    `;
    chatBody.appendChild(div);
    this.scrollToBottom();
  },

  showThinkingIndicator() {
    const chatBody = document.getElementById('aiChatBody');
    if (!chatBody) return;

    const div = document.createElement('div');
    div.id = 'aiThinkingIndicator';
    div.className = 'ai-msg ai-msg-assistant thinking animate-in';
    div.innerHTML = `
      <div class="ai-msg-avatar">✨</div>
      <div class="ai-msg-content">
        <div class="ai-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    chatBody.appendChild(div);
    this.scrollToBottom();
  },

  removeThinkingIndicator() {
    const el = document.getElementById('aiThinkingIndicator');
    if (el) el.remove();
  },

  scrollToBottom() {
    const chatBody = document.getElementById('aiChatBody');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  },

  // Intelligent domain-restricted response engine
  generateResponse(query) {
    const q = query.toLowerCase();

    // 1. Off-topic filter check:
    const offTopicKeywords = [
      'weather', 'cricket', 'football', 'bitcoin', 'crypto', 'recipe', 'movie', 'song',
      'president of usa', 'python code for', 'hack', 'chatgpt', 'openai', 'joke', 'capital of'
    ];

    const isCreditTopic = q.includes('nsfdc') || q.includes('loan') || q.includes('credit') ||
      q.includes('entrepreneur') || q.includes('business') || q.includes('channel partner') ||
      q.includes('emi') || q.includes('moratorium') || q.includes('term loan') || q.includes('micro finance');

    const isExplicitlyOffTopic = offTopicKeywords.some(w => q.includes(w)) &&
      !q.includes('samarthya') && !q.includes('labhsetu') && !q.includes('scheme') && !q.includes('disability') && !q.includes('scholarship') &&
      !isCreditTopic;

    if (isExplicitlyOffTopic) {
      return `
        <div class="ai-restricted-notice">
          <span style="font-size:18px">🛡️</span>
          <strong>LABHSETU AI Domain Assistant</strong>
        </div>
        <p>Main <strong>LABHSETU AI Portal</strong>, <strong>PwD Welfare Schemes</strong> aur <strong>NSFDC Concessional Credit Schemes (SC Entrepreneurs)</strong> ke baare mein jaankari dene ke liye trained hoon.</p>
        <p style="margin-top:8px">Aap mujhse pooch sakte hain:</p>
        <ul style="margin-top:6px;padding-left:18px;font-size:13px;line-height:1.6">
          <li>PwD Scholarships &amp; Assistive Aids (ADIP, NSP)</li>
          <li>NSFDC Micro Finance (≤ ₹1.4L) &amp; Term Loans (≤ ₹50L)</li>
          <li>6.5%–8% Concessional Interest Rates &amp; Moratorium Holidays</li>
          <li>Nearest Capable Channel Partners (SCAs, PSBs, RRBs)</li>
        </ul>
      `;
    }

    // 2. NSFDC Concessional Loans & Credit Schemes (SIH26093)
    if (q.includes('nsfdc') || q.includes('credit scheme') || (q.includes('loan') && (q.includes('sc') || q.includes('business') || q.includes('interest') || q.includes('apply')))) {
      return `
        <h4 style="color:var(--accent-mint);margin-bottom:6px">💼 NSFDC Concessional Credit Schemes</h4>
        <p>National Scheduled Castes Finance &amp; Development Corporation (NSFDC) provides low-interest channel finance (6.5%–12% vs commercial 14%–18%) for SC beneficiaries with annual family income <strong>≤ ₹5.0 Lakh</strong>.</p>
        <div style="margin-top:8px;display:flex;flex-direction:column;gap:8px">
          <div class="ai-scheme-mini-card">
            <strong>1. Micro Finance Scheme (≤ ₹1.40 Lakh)</strong>
            <p style="font-size:12px;color:var(--text-muted)">6.5%–8% p.a. interest, 3–6 months moratorium holiday. Designed for micro-enterprises, small trade, and artisan activities.</p>
          </div>
          <div class="ai-scheme-mini-card">
            <strong>2. Term Loan Scheme (≤ ₹50.00 Lakh)</strong>
            <p style="font-size:12px;color:var(--text-muted)">8%–12% interest, up to 12 months moratorium, up to 10 years tenure. Up to 90% project cost financed for viable business ventures.</p>
          </div>
          <div class="ai-scheme-mini-card">
            <strong>3. Education Loan Scheme (≤ ₹20L India / ₹40L Abroad)</strong>
            <p style="font-size:12px;color:var(--text-muted)">6.5% for female students, 7.5% for male students. Zero EMI during course + 6 months post-study moratorium.</p>
          </div>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn-sm btn-primary" onclick="App.setPersona('credit');App.navigate('match')">🎯 Match Credit Schemes</button>
          <button class="btn-sm btn-secondary" onclick="LabhsetuAI.openWithPrompt('Which channel partner should I apply through for credit?')">Find Channel Partners</button>
        </div>
      `;
    }

    // 3. Channel Partners & NPA Routing (SIH26093 Problem Statement)
    if (q.includes('channel partner') || q.includes('sca') || q.includes('where to apply') || q.includes('apply through') || q.includes('npa') || q.includes('bank')) {
      return `
        <h4 style="color:var(--accent-cyan);margin-bottom:6px">📍 How Channel Partner Routing Works</h4>
        <p><strong>Crucial Rule:</strong> NSFDC does <em>not</em> disburse loans directly to individuals. All applications route through accredited <strong>Channel Partners</strong>:</p>
        <ul style="margin-top:8px;padding-left:18px;font-size:13px;line-height:1.6">
          <li><strong>State Channelizing Agencies (SCAs):</strong> e.g., DSFDC (Delhi), UPSCFDC (UP), MPBCDC (Maharashtra), TAHDCO (Tamil Nadu).</li>
          <li><strong>Public Sector Banks (PSBs):</strong> PNB, SBI, Bank of Baroda, Canara Bank with dedicated MSME credit desks.</li>
          <li><strong>Regional Rural Banks (RRBs) &amp; NBFC-MFIs:</strong> Aryavart Bank, NABFINS, Satin Creditcare.</li>
        </ul>
        <div class="ai-feature-card" style="margin-top:10px">
          <strong>🛡️ LABHSETU AI "Nearest Capable" Filter:</strong>
          <p style="font-size:12px;color:var(--text-secondary);margin-top:4px">
            Many applicants face delays because they unknowingly apply at branches with high NPA backlogs or paused fund quotas. LABHSETU AI's Geo-Spatial Locator filters out high-NPA branches by default to route you to healthy lenders!
          </p>
        </div>
      `;
    }

    // 4. EMI, Moratorium & Interest Calculations
    if (q.includes('emi') || q.includes('moratorium') || q.includes('interest rate') || q.includes('repayment') || q.includes('calculation') || q.includes('byaj')) {
      return `
        <h4 style="color:var(--accent-gold);margin-bottom:6px">🧮 EMI &amp; Moratorium Protection</h4>
        <p>NSFDC loans feature statutory <strong>Moratorium Periods</strong> where borrowers are exempt from paying EMIs:</p>
        <ul style="margin-top:8px;padding-left:18px;font-size:13px;line-height:1.6">
          <li><strong>Micro Finance:</strong> 3 to 6 months EMI holiday while you establish your trade.</li>
          <li><strong>Term Loan:</strong> 6 to 12 months moratorium while factory/equipment is set up.</li>
          <li><strong>Education Loan:</strong> Full course duration + 6 months post-study holiday.</li>
        </ul>
        <p style="margin-top:8px;font-size:13px">Use our <strong>Financial Calculator</strong> to compute your exact month-by-month repayment schedule and download CSV projections!</p>
      `;
    }

    // 5. What is LABHSETU AI / About
    if (q.includes('what is labhsetu') || q.includes('about labhsetu') || q.includes('labhsetu kya hai') || q.includes('how does labhsetu ai work') || q.includes('what is samarthya') || q.includes('about samarthya') || q.includes('samarthya kya hai') || q.includes('how does it work') || q.includes('kaise kaam karta')) {
      return `
        <h4 style="color:var(--accent-mint);margin-bottom:6px">🚀 About LABHSETU AI</h4>
        <p><strong>LABHSETU AI</strong> is an intelligent government scheme matching portal with dual-track intelligence:</p>
        <div class="ai-feature-card">
          <div style="font-weight:700;color:#fff;margin-bottom:4px">Dual Track Capabilities:</div>
          <ul style="padding-left:18px;font-size:13px;line-height:1.6">
            <li><strong>♿ Welfare Track:</strong> Instant matching across 50+ central &amp; state PwD welfare schemes and scholarships in &lt;2s.</li>
            <li><strong>💼 Credit Track (SIH26093):</strong> Concessional credit &amp; education loan matching for SC entrepreneurs seeking NSFDC channel finance.</li>
            <li><strong>100% Privacy-First:</strong> Zero Aadhaar or document upload required; fully DPDP Act 2023 compliant.</li>
            <li><strong>Nearest Capable Locator:</strong> Map-based directory filtering out high-NPA channel partner branches.</li>
          </ul>
        </div>
        <button class="btn-sm btn-primary" style="margin-top:10px" onclick="App.navigate('match')">Start Finding Schemes →</button>
      `;
    }

    // 3. Privacy / Aadhaar / Document Upload questions
    if (q.includes('aadhaar') || q.includes('document upload') || q.includes('privacy') || q.includes('data') || q.includes('safe')) {
      return `
        <h4 style="color:var(--accent-green);margin-bottom:6px">🔒 100% Privacy & Zero Document Uploads</h4>
        <p><strong>No Aadhaar card or personal document upload is required on LABHSETU AI!</strong></p>
        <ul style="margin-top:8px;padding-left:18px;font-size:13px;line-height:1.6">
          <li>LABHSETU AI matches schemes entirely in your browser using anonymous criteria (age, disability type, percentage, state, and income slab).</li>
          <li>Your personal data is never stored on our servers, ensuring complete alignment with India's <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>.</li>
          <li>When you are ready to apply officially, you directly submit your documents on authorized official government portals like <strong>scholarships.gov.in</strong> or <strong>swavlambancard.gov.in</strong>.</li>
        </ul>
      `;
    }

    // 4. Scholarships (Pre-Matric, Post-Matric, Top Class)
    if (q.includes('scholarship') || q.includes('study') || q.includes('education') || q.includes('padhai') || q.includes('post matric') || q.includes('pre matric')) {
      return `
        <h4 style="color:var(--accent-mint);margin-bottom:6px">🎓 Top Government Scholarships for PwD</h4>
        <div style="margin-top:8px;display:flex;flex-direction:column;gap:8px">
          <div class="ai-scheme-mini-card">
            <strong>1. Pre-Matric Scholarship (Class 9-10)</strong>
            <p style="font-size:12px;color:var(--text-muted)">Eligibility: 40%+ disability, Income ≤ ₹2.5L/yr. Provides maintenance allowance + book grants.</p>
          </div>
          <div class="ai-scheme-mini-card">
            <strong>2. Post-Matric Scholarship (Class 11, 12, Degree, PG)</strong>
            <p style="font-size:12px;color:var(--text-muted)">Eligibility: Class 11+, 40%+ disability, Income ≤ ₹2.5L/yr. Full tuition fee + up to ₹4,000/mo allowance.</p>
          </div>
          <div class="ai-scheme-mini-card">
            <strong>3. Top Class Education Scholarship</strong>
            <p style="font-size:12px;color:var(--text-muted)">For students in premier institutions (IIT, IIM, NIT, AIIMS, Central Univs) with ₹2L/yr tuition + ₹30,000 laptop grant.</p>
          </div>
          <div class="ai-scheme-mini-card">
            <strong>4. National Fellowship for Persons with Disabilities (NFPwD)</strong>
            <p style="font-size:12px;color:var(--text-muted)">For M.Phil and Ph.D. scholars (JRF ₹31,000/mo, SRF ₹35,000/mo).</p>
          </div>
        </div>
        <p style="margin-top:10px;font-size:12px;color:#94a3b8">📌 <em>All these scholarships are processed through the National Scholarship Portal (NSP).</em></p>
      `;
    }

    // 5. Assistive Devices / ADIP / Equipment / Wheelchair / Hearing Aid
    if (q.includes('adip') || q.includes('device') || q.includes('wheelchair') || q.includes('hearing') || q.includes('braille') || q.includes('aid') || q.includes('appliance') || q.includes('equipment')) {
      return `
        <h4 style="color:var(--accent-gold);margin-bottom:6px">🦽 ADIP Scheme (Free Assistive Aids)</h4>
        <p>The <strong>ADIP Scheme</strong> provides free, modern aids and appliances through ALIMCO to improve independence.</p>
        <div class="ai-feature-card">
          <div style="font-weight:700;color:#fff;margin-bottom:4px">Key Entitlements:</div>
          <ul style="padding-left:18px;font-size:13px;line-height:1.6">
            <li><strong>Locomotor:</strong> Motorized tricycles, smart wheelchairs, prosthetic limbs, crutches.</li>
            <li><strong>Visual:</strong> Smart canes (Daisy players), Braille slates, screen-reading tablets, laptops with JAWS.</li>
            <li><strong>Hearing:</strong> Digital behind-the-ear hearing aids, cochlear implants (up to ₹6 Lakh for children under 5).</li>
            <li><strong>Income Limit:</strong> 100% free aid if family income is up to ₹20,000/month; 50% subsidy for ₹20,001–₹30,000/month.</li>
          </ul>
        </div>
      `;
    }

    // 6. Required Documents / Eligibility / UDID
    if (q.includes('document') || q.includes('udid') || q.includes('kya document') || q.includes('eligibility') || q.includes('documents needed')) {
      return `
        <h4 style="color:var(--accent-cyan);margin-bottom:6px">📄 Standard Documents for Government Schemes</h4>
        <p>When applying for government schemes, you will typically need:</p>
        <ol style="margin-top:8px;padding-left:20px;font-size:13px;line-height:1.6">
          <li><strong>Disability Certificate / UDID Card:</strong> Showing minimum 40% benchmark disability.</li>
          <li><strong>Income Certificate:</strong> Issued by Tehsildar / Competent Revenue Officer.</li>
          <li><strong>Educational Marksheets:</strong> Previous class / semester passing certificates.</li>
          <li><strong>Aadhaar Card &amp; Bank Account:</strong> Bank account seeded with Aadhaar for Direct Benefit Transfer (DBT).</li>
          <li><strong>Domicile / Residence Proof:</strong> For state-sponsored welfare schemes.</li>
        </ol>
      `;
    }

    // 7. WhatsApp Channel / Alerts / Notification
    if (q.includes('whatsapp') || q.includes('channel') || q.includes('group') || q.includes('notification') || q.includes('update') || q.includes('alert')) {
      return `
        <h4 style="color:#25D366;margin-bottom:6px">💬 Official WhatsApp Channel</h4>
        <p>Stay ahead with instant alerts whenever the Ministry of Social Justice or State Governments announce new scholarships, deadline extensions, or assistive equipment distribution camps!</p>
        <div style="margin-top:10px">
          <button class="btn-sm btn-primary" onclick="WhatsAppLead.openModal()">
            📢 Open LABHSETU AI Channel by SONTU KUMAR RANA
          </button>
        </div>
      `;
    }

    // 8. General matching query / default response
    return `
      <p>I can help you explore the government programmes currently listed on LABHSETU AI:</p>
      <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px">• <strong>Students:</strong> disability scholarships, Central Sector scholarship, and girls' technical education support.</div>
        <div style="font-size:13px">• <strong>Women & Girls:</strong> AICTE Pragati and Sukanya Samriddhi account information.</div>
        <div style="font-size:13px">• <strong>Work & Careers:</strong> skill/employment support and registered apprenticeship information.</div>
        <div style="font-size:13px">• <strong>Disability Welfare:</strong> assistive devices, travel concessions, pensions, and support services.</div>
        <div style="font-size:13px">• <strong>Assistive Devices:</strong> ADIP, ALIMCO free kits, Motorized tricycles.</div>
        <div style="font-size:13px">• <strong>SC Enterprise Credit:</strong> NSFDC concessional loans, calculators, and channel partner discovery.</div>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn-sm btn-primary" onclick="App.navigate('match')">🎯 Match My Schemes</button>
        <button class="btn-sm btn-secondary" onclick="LabhsetuAI.openWithPrompt('Which scholarships are available for 40%+ disability?')">Scholarship Details</button>
      </div>
    `;
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

window.LabhsetuAI = LabhsetuAI;