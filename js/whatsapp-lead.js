// ============================================
// LABHSETU AI — WhatsApp Lead Capture & Scheme Updates Modal
// Triggered seamlessly when user matches schemes
// ============================================

const WhatsAppLead = {
    hasPromptedThisSession: false,
    whatsappPhoneNumber: '918210403268',
    whatsappChannelUrl: 'https://whatsapp.com/channel/0029Vb90zigATRShQNhLtm2j',
    channelName: 'LABHSETU AI',
    channelOwner: 'SONTU KUMAR RANA',

    directChatUrl() {
        const message = 'Namaste, mujhe LABHSETU AI se yojanaon ke baare mein madad chahiye.';
        return `https://wa.me/${this.whatsappPhoneNumber}?text=${encodeURIComponent(message)}`;
    },

    init() {
        // Check if user already joined
        const saved = localStorage.getItem('labhsetu_wa_joined') || localStorage.getItem('samarthya_wa_joined');
        if (saved) {
            this.hasPromptedThisSession = true;
            localStorage.setItem('labhsetu_wa_joined', saved);
        }
    },

    triggerPostMatchModal(schemesCount = 8) {
        if (this.hasPromptedThisSession) return;
        this.hasPromptedThisSession = true;

        setTimeout(() => {
            this.openModal(schemesCount);
        }, 1200);
    },

    openModal(schemesCount = 8) {
        const overlay = document.getElementById('modalOverlay');
        const content = document.getElementById('modalContent');
        if (!overlay || !content) return;

        content.innerHTML = `
      <div class="wa-lead-card animate-in" role="dialog" aria-modal="true" aria-labelledby="waLeadTitle">
        <button class="wa-lead-close" type="button" onclick="App.closeModal()" aria-label="Close WhatsApp options">✕</button>

        <div class="wa-lead-badge">
          <span class="wa-pulse-dot"></span>
          <span>OFFICIAL WHATSAPP CHANNEL</span>
        </div>

        <div class="wa-lead-icon-ring">
          <div class="wa-icon-glow"></div>
          <div class="wa-logo-icon">💬</div>
        </div>

        <h3 class="wa-lead-title" id="waLeadTitle">Follow <span class="gradient-text">${this.channelName}</span></h3>

        <p class="wa-lead-subtitle">
          सरकारी योजनाओं, आवेदन की तारीखों और जरूरी अपडेट के लिए LABHSETU AI WhatsApp Channel से जुड़ें।
        </p>

        <div class="wa-contact-card">
          <span class="wa-contact-label">CHANNEL PROFILE</span>
          <strong>${this.channelName}</strong>
          <span>Channel by <b>${this.channelOwner}</b></span>
        </div>

        <div class="wa-lead-actions">
          <a href="${this.whatsappChannelUrl}" target="_blank" rel="noopener noreferrer" onclick="WhatsAppLead.handleJoinClick()" class="btn btn-wa-submit">
            <span style="font-size:20px">📢</span>
            <span>Follow ${this.channelName} Channel</span>
            <span style="font-size:18px">→</span>
          </a>
          <a href="${this.directChatUrl()}" target="_blank" rel="noopener noreferrer" onclick="WhatsAppLead.handleDirectChatClick()" class="wa-channel-link">Chat directly with LABHSETU AI support</a>
        </div>

        <p class="wa-lead-disclaimer">Channel kholne ke baad WhatsApp mein Follow dabayein. Is page par aapka phone number collect nahi hota.</p>
      </div>
    `;

        overlay.classList.add('active');
    },

    handleDirectChatClick() {
        setTimeout(() => {
            App.closeModal();
        }, 300);
    },

    handleJoinClick() {
        localStorage.setItem('labhsetu_wa_joined', 'true');
        setTimeout(() => {
            App.closeModal();
        }, 1200);
    }
};

window.WhatsAppLead = WhatsAppLead;