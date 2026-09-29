// ============================================
// LABHSETU AI — Self-Contained MVP Database Engine
// Persistent Storage for Users, Applications & Admin Management
// ============================================

const LabhsetuDB = {
    DB_KEY_USERS: 'labhsetu_db_users',
    DB_KEY_APPS: 'labhsetu_db_applications',
    DB_KEY_PROFILES: 'labhsetu_db_profiles',
    DB_KEY_SCHEMES: 'labhsetu_db_custom_schemes',
    DB_KEY_LOGS: 'labhsetu_db_logs',
    DB_KEY_TRACKED_APPS: 'labhsetu_tracked_apps',
    IDB_NAME: 'labhsewa_portal',
    IDB_VERSION: 2,
    idb: null,
    dbReady: null,

    // Default Seed Data
    defaultAdmin: {
        id: 'admin_root',
        name: 'Director General (Disability Welfare)',
        email: 'admin@labhsetu.gov.in',
        password: 'admin@123',
        role: 'admin',
        department: 'Department of Empowerment of Persons with Disabilities',
        ministry: 'Ministry of Social Justice and Empowerment',
        phone: '+91 11 2436 9054',
        state: 'Delhi (National Headquarters)',
        verified: true,
        avatar: '👑',
        createdAt: '2026-01-01'
    },

    defaultUsers: [{
            id: 'user_aarav',
            name: 'Aarav Sharma',
            email: 'aarav@student.in',
            password: 'password123',
            role: 'user',
            phone: '+91 98765 43210',
            dob: '2005-04-12',
            state: 'delhi',
            gender: 'male',
            disability: 'Visual Impairment (Blindness)',
            disabilityType: 'blindness',
            disabilityPercent: 75,
            education: 'graduate',
            income: 180000,
            udid: 'DL-01-2023-0098765',
            verified: true,
            avatar: 'A',
            registeredAt: '2026-02-01',
            matchedCount: 9,
            estBenefit: '₹62,000 / yr'
        },
        {
            id: 'user_priya',
            name: 'Priya Verma',
            email: 'priya.verma@gmail.com',
            password: 'password123',
            role: 'user',
            phone: '+91 87654 32109',
            dob: '2003-08-20',
            state: 'uttar_pradesh',
            gender: 'female',
            disability: 'Locomotor Disability',
            disabilityType: 'locomotor_disability',
            disabilityPercent: 60,
            education: 'graduate',
            income: 250000,
            udid: 'UP-09-2024-0012345',
            verified: true,
            avatar: 'P',
            registeredAt: '2026-02-10',
            matchedCount: 7,
            estBenefit: '₹48,000 / yr'
        },
        {
            id: 'user_sunita',
            name: 'Sunita Sharma',
            email: 'sunita.sharma@gmail.com',
            password: 'password123',
            role: 'user',
            phone: '+91 99887 76655',
            dob: '2003-05-14',
            state: 'uttar_pradesh',
            gender: 'female',
            disability: 'Locomotor Disability',
            disabilityType: 'locomotor_disability',
            disabilityPercent: 55,
            education: 'graduate',
            income: 150000,
            udid: 'UP14200305140029',
            verified: true,
            avatar: 'S',
            registeredAt: '2026-02-14',
            matchedCount: 11,
            estBenefit: '₹75,000 / yr'
        },
        {
            id: 'user_rahul',
            name: 'Rahul Verma',
            email: 'rahul.verma@gmail.com',
            password: 'password123',
            role: 'user',
            phone: '+91 91234 56789',
            dob: '2005-09-20',
            state: 'delhi',
            gender: 'male',
            disability: 'Visual Impairment',
            disabilityType: 'blindness',
            disabilityPercent: 75,
            education: 'higher_secondary',
            income: 100000,
            udid: 'DL08200509200084',
            verified: true,
            avatar: 'R',
            registeredAt: '2026-02-18',
            matchedCount: 8,
            estBenefit: '₹55,000 / yr'
        },
        {
            id: 'user_amit',
            name: 'Amit Patel',
            email: 'amit.patel@gmail.com',
            password: 'password123',
            role: 'user',
            phone: '+91 98760 12345',
            dob: '2002-11-12',
            state: 'maharashtra',
            gender: 'male',
            disability: 'Hearing Impairment',
            disabilityType: 'deaf',
            disabilityPercent: 60,
            education: 'post_graduate',
            income: 250000,
            udid: 'MH22200211120019',
            verified: true,
            avatar: 'A',
            registeredAt: '2026-02-22',
            matchedCount: 6,
            estBenefit: '₹40,000 / yr'
        }
    ],

    defaultApplications: [{
            id: 'APP-2026-8819',
            userId: 'user_aarav',
            userName: 'Aarav Sharma',
            userEmail: 'aarav@student.in',
            schemeId: 'post_matric_pwd',
            schemeName: 'Post-Matric Scholarship for Students with Disabilities',
            ministry: 'DEPwD, Govt of India',
            appliedDate: '2026-02-12',
            deadline: '2026-03-31',
            status: 'verification', // draft, applied, verification, review, approved, disbursed
            benefitAmount: '₹48,000 / year',
            udid: 'DL-01-2023-0098765',
            documents: ['UDID Card', 'Fee Receipt', 'Income Cert'],
            notes: 'Initial documents verified by District Officer.'
        },
        {
            id: 'APP-2026-9204',
            userId: 'user_priya',
            userName: 'Priya Verma',
            userEmail: 'priya.verma@gmail.com',
            schemeId: 'adip_scheme',
            schemeName: 'ADIP Scheme (Free Motorized Wheelchair)',
            ministry: 'Ministry of Social Justice and Empowerment',
            appliedDate: '2026-01-25',
            deadline: '2026-04-15',
            status: 'approved',
            benefitAmount: 'Motorized Tricycle (₹37,000 value)',
            udid: 'UP-09-2024-0012345',
            documents: ['Disability Certificate 60%', 'Aadhaar Card'],
            notes: 'Sanctioned under ALIMCO Camp Drive.'
        },
        {
            id: 'APP-2026-7412',
            userId: 'user_sunita',
            userName: 'Sunita Sharma',
            userEmail: 'sunita.sharma@gmail.com',
            schemeId: 'top_class_education_pwd',
            schemeName: 'Top Class Education Scheme for Students with Disabilities',
            ministry: 'DEPwD, Govt of India',
            appliedDate: '2026-02-18',
            deadline: '2026-05-15',
            status: 'review',
            benefitAmount: 'Full Tuition Waiver + ₹3,000/mo',
            udid: 'UP14200305140029',
            documents: ['Institute Admission Letter', 'UDID Card'],
            notes: 'Under review by National Nodal Officer.'
        },
        {
            id: 'APP-2026-5531',
            userId: 'user_rahul',
            userName: 'Rahul Verma',
            userEmail: 'rahul.verma@gmail.com',
            schemeId: 'pre_matric_pwd',
            schemeName: 'Pre-Matric Scholarship for Special Students',
            ministry: 'DEPwD, Govt of India',
            appliedDate: '2026-02-20',
            deadline: '2026-03-31',
            status: 'applied',
            benefitAmount: '₹25,000 / year',
            udid: 'DL08200509200084',
            documents: ['School Certificate', 'Disability Cert 75%'],
            notes: 'Application received via NSP Portal.'
        }
    ],

    // --------- Database Initialization ---------
    init() {
        this.migrateLegacyStorageKeys();

        // Check and seed Users table
        if (!localStorage.getItem(this.DB_KEY_USERS)) {
            const allUsers = [this.defaultAdmin, ...this.defaultUsers];
            localStorage.setItem(this.DB_KEY_USERS, JSON.stringify(allUsers));
        }

        // Check and seed Applications table
        if (!localStorage.getItem(this.DB_KEY_APPS)) {
            localStorage.setItem(this.DB_KEY_APPS, JSON.stringify(this.defaultApplications));
        }

        // Audit logs
        if (!localStorage.getItem(this.DB_KEY_LOGS)) {
            localStorage.setItem(this.DB_KEY_LOGS, JSON.stringify([
                { action: 'DB_INIT', details: 'Database initialized with 5 users and 1 admin record', timestamp: new Date().toISOString() }
            ]));
        }

        this.initializePersistentStore();
    },

    migrateLegacyStorageKeys() {
        const keyPairs = [
            [this.DB_KEY_USERS, 'samarthya_db_users'],
            [this.DB_KEY_APPS, 'samarthya_db_applications'],
            [this.DB_KEY_PROFILES, 'samarthya_db_profiles'],
            [this.DB_KEY_SCHEMES, 'samarthya_db_custom_schemes'],
            [this.DB_KEY_LOGS, 'samarthya_db_logs'],
            [this.DB_KEY_TRACKED_APPS, 'samarthya_tracked_apps']
        ];

        keyPairs.forEach(([currentKey, legacyKey]) => {
            if (localStorage.getItem(currentKey) !== null) return;
            const legacyValue = localStorage.getItem(legacyKey);
            if (legacyValue !== null) localStorage.setItem(currentKey, legacyValue);
        });
    },

    initializePersistentStore() {
        if (this.dbReady) return this.dbReady;
        if (!window.indexedDB) {
            this.dbReady = Promise.resolve(null);
            return this.dbReady;
        }

        this.dbReady = new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.IDB_NAME, this.IDB_VERSION);
            request.onupgradeneeded = () => {
                const database = request.result;
                ['users', 'applications', 'profiles', 'trackedApplications', 'customSchemes', 'auditLogs'].forEach(storeName => {
                    if (!database.objectStoreNames.contains(storeName)) {
                        database.createObjectStore(storeName, { keyPath: 'id' });
                    }
                });
            };
            request.onsuccess = () => {
                this.idb = request.result;
                this.migrateLegacyData().then(() => resolve(this.idb)).catch(reject);
            };
            request.onerror = () => reject(request.error);
            request.onblocked = () => reject(new Error('IndexedDB upgrade is blocked'));
        }).catch(error => {
            console.warn('IndexedDB unavailable; using localStorage fallback:', error);
            this.idb = null;
            return null;
        });

        return this.dbReady;
    },

    async migrateLegacyData() {
        const migrations = [
            ['users', this.DB_KEY_USERS, [this.defaultAdmin, ...this.defaultUsers]],
            ['applications', this.DB_KEY_APPS, this.defaultApplications],
            ['profiles', this.DB_KEY_PROFILES, []],
            ['trackedApplications', this.DB_KEY_TRACKED_APPS, []],
            ['customSchemes', this.DB_KEY_SCHEMES, []],
            ['auditLogs', this.DB_KEY_LOGS, []]
        ];

        for (const [storeName, storageKey, defaults] of migrations) {
            const existing = await this.readStore(storeName);
            if (existing.length) continue;

            let records = defaults;
            try {
                const stored = localStorage.getItem(storageKey);
                if (stored !== null) records = JSON.parse(stored);
            } catch (error) {
                console.warn(`Could not migrate ${storageKey}:`, error);
            }

            if (!Array.isArray(records)) continue;
            const normalized = records.map((record, index) => ({
                ...record,
                id: record.id || `${storeName}_${Date.now()}_${index}`
            }));
            await this.writeStore(storeName, normalized);
        }
    },

    transactionComplete(transaction) {
        return new Promise((resolve, reject) => {
            transaction.oncomplete = resolve;
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'));
        });
    },

    async readStore(storeName) {
        if (!this.idb) return [];
        const transaction = this.idb.transaction(storeName, 'readonly');
        const request = transaction.objectStore(storeName).getAll();
        const records = await new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
        await this.transactionComplete(transaction);
        return records;
    },

    async writeStore(storeName, records) {
        if (!this.idb) return false;
        const transaction = this.idb.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        store.clear();
        records.forEach(record => store.put(record));
        await this.transactionComplete(transaction);
        return true;
    },

    persistStore(storeName, records) {
        return this.initializePersistentStore().then(() => this.writeStore(storeName, records)).catch(error => {
            console.warn(`Could not persist ${storeName} in IndexedDB:`, error);
            return false;
        });
    },

    async getTrackedApplications() {
        await this.initializePersistentStore();
        if (this.idb) return this.readStore('trackedApplications');
        try {
            return JSON.parse(localStorage.getItem(this.DB_KEY_TRACKED_APPS) || '[]');
        } catch (error) {
            return [];
        }
    },

    async saveTrackedApplications(records) {
        const safeRecords = Array.isArray(records) ? records : [];
        localStorage.setItem(this.DB_KEY_TRACKED_APPS, JSON.stringify(safeRecords));
        await this.initializePersistentStore();
        if (this.idb) await this.writeStore('trackedApplications', safeRecords);
        return safeRecords;
    },

    async getProfile(profileType) {
        try {
            await this.initializePersistentStore();
            if (this.idb) {
                const transaction = this.idb.transaction('profiles', 'readonly');
                const request = transaction.objectStore('profiles').get(profileType);
                const profile = await new Promise((resolve, reject) => {
                    request.onsuccess = () => resolve(request.result || null);
                    request.onerror = () => reject(request.error);
                });
                await this.transactionComplete(transaction);
                if (profile) return profile.data;
            }
        } catch (error) {
            console.warn('Could not load profile from IndexedDB:', error);
        }

        try {
            const profiles = JSON.parse(localStorage.getItem(this.DB_KEY_PROFILES) || '[]');
            const record = profiles.find(item => item.id === profileType);
            return record ? record.data : null;
        } catch (error) {
            return null;
        }
    },

    async saveProfile(profileType, profile) {
        const record = {
            id: profileType,
            data: profile,
            updatedAt: new Date().toISOString()
        };
        try {
            await this.initializePersistentStore();
            if (this.idb) {
                const transaction = this.idb.transaction('profiles', 'readwrite');
                transaction.objectStore('profiles').put(record);
                await this.transactionComplete(transaction);
                return true;
            }
        } catch (error) {
            console.warn('Could not save profile in IndexedDB; using localStorage:', error);
        }

        try {
            const profiles = JSON.parse(localStorage.getItem(this.DB_KEY_PROFILES) || '[]');
            const index = profiles.findIndex(item => item.id === profileType);
            if (index >= 0) profiles[index] = record;
            else profiles.push(record);
            localStorage.setItem(this.DB_KEY_PROFILES, JSON.stringify(profiles));
            return true;
        } catch (error) {
            console.error('Could not save profile:', error);
            return false;
        }
    },

    // --------- USERS TABLE OPERATIONS ---------
    getAllUsers() {
        try {
            const data = localStorage.getItem(this.DB_KEY_USERS);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    getUserByEmail(email) {
        const users = this.getAllUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim() || (u.udid && u.udid.toLowerCase() === email.toLowerCase().trim()));
    },

    getUserById(id) {
        const users = this.getAllUsers();
        return users.find(u => u.id === id);
    },

    saveUser(user) {
        const users = this.getAllUsers();
        const idx = users.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
        if (idx >= 0) {
            users[idx] = {...users[idx], ...user, updatedAt: new Date().toISOString() };
        } else {
            user.id = user.id || 'user_' + Date.now();
            user.registeredAt = user.registeredAt || new Date().toISOString().split('T')[0];
            user.role = user.role || 'user';
            users.push(user);
        }
        localStorage.setItem(this.DB_KEY_USERS, JSON.stringify(users));
        this.persistStore('users', users);
        this.logAction('USER_SAVE', `Saved profile for ${user.name} (${user.email})`);
        return user;
    },

    deleteUser(userId) {
        let users = this.getAllUsers();
        const target = users.find(u => u.id === userId);
        if (target && target.role === 'admin') {
            alert('Cannot delete the root Administrator account.');
            return false;
        }
        users = users.filter(u => u.id !== userId);
        localStorage.setItem(this.DB_KEY_USERS, JSON.stringify(users));
        this.persistStore('users', users);
        this.logAction('USER_DELETE', `Deleted user ${userId}`);
        return true;
    },

    verifyUserUDID(userId, status = true) {
        const users = this.getAllUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.verified = status;
            localStorage.setItem(this.DB_KEY_USERS, JSON.stringify(users));
            this.persistStore('users', users);
            this.logAction('USER_VERIFY', `Set UDID verification to ${status} for ${user.name}`);
            return true;
        }
        return false;
    },

    // --------- APPLICATIONS TABLE OPERATIONS ---------
    getAllApplications() {
        try {
            const data = localStorage.getItem(this.DB_KEY_APPS);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    getUserApplications(userId) {
        const apps = this.getAllApplications();
        return apps.filter(a => a.userId === userId);
    },

    saveApplication(app) {
        const apps = this.getAllApplications();
        const idx = apps.findIndex(a => a.id === app.id);
        if (idx >= 0) {
            apps[idx] = {...apps[idx], ...app, updatedAt: new Date().toISOString() };
        } else {
            app.id = app.id || 'APP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
            app.appliedDate = app.appliedDate || new Date().toISOString().split('T')[0];
            apps.unshift(app);
        }
        localStorage.setItem(this.DB_KEY_APPS, JSON.stringify(apps));
        this.persistStore('applications', apps);
        this.logAction('APP_SAVE', `Application ${app.id} updated to status: ${app.status}`);
        return app;
    },

    updateApplicationStatus(appId, newStatus, adminNote = '') {
        const apps = this.getAllApplications();
        const app = apps.find(a => a.id === appId);
        if (app) {
            app.status = newStatus;
            if (adminNote) app.notes = adminNote;
            app.updatedAt = new Date().toISOString();
            localStorage.setItem(this.DB_KEY_APPS, JSON.stringify(apps));
            this.persistStore('applications', apps);
            this.logAction('APP_STATUS_CHANGE', `Application ${appId} changed to ${newStatus}`);
            return true;
        }
        return false;
    },

    deleteApplication(appId) {
        let apps = this.getAllApplications();
        apps = apps.filter(a => a.id !== appId);
        localStorage.setItem(this.DB_KEY_APPS, JSON.stringify(apps));
        this.persistStore('applications', apps);
        this.logAction('APP_DELETE', `Deleted application ${appId}`);
        return true;
    },

    // --------- AUDIT LOGGING ---------
    logAction(action, details) {
        try {
            const logs = JSON.parse(localStorage.getItem(this.DB_KEY_LOGS) || '[]');
            const actor = (typeof Auth !== 'undefined' && Auth && Auth.currentUser) ? Auth.currentUser.email : 'System';
            logs.unshift({
                action,
                details,
                timestamp: new Date().toISOString(),
                actor: actor
            });
            if (logs.length > 200) logs.pop();
            localStorage.setItem(this.DB_KEY_LOGS, JSON.stringify(logs));
            this.persistStore('auditLogs', logs.map((log, index) => ({
                ...log,
                id: log.id || `audit_${Date.now()}_${index}`
            })));
        } catch (e) {}
    },

    getAuditLogs() {
        try {
            return JSON.parse(localStorage.getItem(this.DB_KEY_LOGS) || '[]');
        } catch (e) {
            return [];
        }
    },

    // --------- DATABASE METRICS ---------
    getStats() {
        const users = this.getAllUsers().filter(u => u.role !== 'admin');
        const apps = this.getAllApplications();
        const verifiedCount = users.filter(u => u.verified).length;
        const approvedCount = apps.filter(a => a.status === 'approved' || a.status === 'disbursed').length;

        let totalDisbursedValue = 0;
        apps.forEach(a => {
            if (a.status === 'approved' || a.status === 'disbursed') {
                const num = (a.benefitAmount || '').match(/₹([\d,]+)/);
                if (num) totalDisbursedValue += parseInt(num[1].replace(/,/g, ''));
                else totalDisbursedValue += 35000;
            }
        });

        return {
            totalUsers: users.length,
            verifiedUsers: verifiedCount,
            totalApplications: apps.length,
            approvedApplications: approvedCount,
            pendingVerifications: apps.filter(a => a.status === 'applied' || a.status === 'verification').length,
            totalSanctionedValue: totalDisbursedValue || 185000
        };
    }
};

// Auto-initialize DB
LabhsetuDB.init();
window.LabhsetuDB = LabhsetuDB;
window.SamarthyaDB = LabhsetuDB;