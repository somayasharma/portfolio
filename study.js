/**
 * STUDY FLOW DASHBOARD - CONTROLLER & DATABASE
 * Manages the curriculum data, localStorage state, filtering, search, and dynamic UI updates.
 */

// 1. THE STUDY CURRICULUM DATASET (25 Structured Steps)
const ROADMAP_DATA = [
    // PHASE 1: Systems Thinking & Process Mapping Foundations
    {
        id: 1,
        phase: 1,
        phaseName: "Systems Consulting Foundations",
        title: "Systems Thinking & Enterprise Architecture",
        duration: "2.5 hours",
        description: "Learn how business strategies translate into structural enterprise systems. Study feedback loops, system boundaries, and structural bottlenecks in operational scaling.",
        resources: [
            { name: "MIT OpenCourseWare: System Dynamics Intro", url: "https://ocw.mit.edu/courses/15-871-introduction-to-system-dynamics-fall-2013/" },
            { name: "The Open Group: TOGAF Standard Core Overview", url: "https://www.opengroup.org/togaf" },
            { name: "Donella Meadows: Thinking in Systems (Core Concepts)", url: "https://donellameadows.org/systems-thinking-resources/" }
        ]
    },
    {
        id: 2,
        phase: 1,
        phaseName: "Systems Consulting Foundations",
        title: "BPMN 2.0 & AS-IS / TO-BE Process Modeling",
        duration: "3.0 hours",
        description: "Master Business Process Model and Notation (BPMN 2.0). Learn to conduct audits, identify process waste, and map out transitions from manual AS-IS states to automated TO-BE processes.",
        resources: [
            { name: "Camunda: Interactive BPMN 2.0 Tutorial", url: "https://camunda.com/bpmn/" },
            { name: "Lucidchart: Business Process Mapping Best Practices", url: "https://www.lucidchart.com/pages/tutorial/process-mapping" },
            { name: "BPMN Quick Reference Guide", url: "https://www.bpmn.org/" }
        ]
    },
    {
        id: 3,
        phase: 1,
        phaseName: "Systems Consulting Foundations",
        title: "Requirements Engineering & Stakeholder Workshops",
        duration: "2.0 hours",
        description: "Discover how to lead process discovery workshops, interview business users, compile functional spec sheets, and draft user stories using the INVEST framework.",
        resources: [
            { name: "IIBA: Guide to Agile Requirements Gathering", url: "https://www.iiba.org/standards-and-resources/babok/" },
            { name: "Atlassian: Drafting Actionable User Stories", url: "https://www.atlassian.com/agile/project-management/user-stories" },
            { name: "Miro: Process Discovery Workshop Templates", url: "https://miro.com/templates/process-mapping-workshop/" }
        ]
    },
    {
        id: 4,
        phase: 1,
        phaseName: "Systems Consulting Foundations",
        title: "MECE & Structured Management Consulting Frameworks",
        duration: "3.0 hours",
        description: "Master the MECE (Mutually Exclusive, Collectively Exhaustive) principle. Learn to structure complex business issues into logical issue trees, SWOT grids, and Porter analysis.",
        resources: [
            { name: "Crafting Cases: MECE Structuring Guide", url: "https://www.craftingcases.com/" },
            { name: "Victor Cheng: Case Interview Core Concepts", url: "https://www.caseinterview.com/" },
            { name: "McKinsey: The Pyramid Principle Overview", url: "https://www.mckinsey.com/featured-insights/mckinsey-classics" }
        ]
    },
    {
        id: 5,
        phase: 1,
        phaseName: "Systems Consulting Foundations",
        title: "Lean Operations & Six Sigma Waste Reductions",
        duration: "2.0 hours",
        description: "Study DMAIC (Define, Measure, Analyze, Improve, Control) methodologies. Recognize the 8 wastes (Muda) in digital environments: overproduction, inventory, motion, waiting, etc.",
        resources: [
            { name: "Lean Enterprise Institute: Lean Operation Guides", url: "https://www.lean.org/" },
            { name: "Six Sigma Institute: DMAIC Methodologies", url: "https://www.leansixsigmainstitute.org/" },
            { name: "Kaizen: Continuous Operational Improvement Guide", url: "https://www.kaizen.com/what-is-kaizen" }
        ]
    },

    // PHASE 2: Low-Code Automation & Power Platform Mastery
    {
        id: 6,
        phase: 2,
        phaseName: "Power Platform & Automation",
        title: "Microsoft Power Platform Architecture (PL-900)",
        duration: "2.5 hours",
        description: "Learn how the component blocks of Power Platform (Apps, Automate, BI, Pages, Copilot Studio) coordinate on the Dataverse security & environments model.",
        resources: [
            { name: "Microsoft Learn: PL-900 Learning Syllabus", url: "https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/" },
            { name: "Guy in a Cube: Power Platform Architectural Overview", url: "https://www.youtube.com/c/GuyinaCube" }
        ]
    },
    {
        id: 7,
        phase: 2,
        phaseName: "Power Platform & Automation",
        title: "Canvas Power Apps: Enterprise UI & Data Schemas",
        duration: "4.0 hours",
        description: "Build custom frontends connected to SharePoint, Excel, or SQL databases. Master expressions (Filter, LookUp, Patch), variables (Set, UpdateContext), and collections.",
        resources: [
            { name: "Microsoft Learn: Build Canvas Apps Path", url: "https://learn.microsoft.com/en-us/training/paths/create-canvas-app/" },
            { name: "Shane Young: Power Apps Canvas Controls", url: "https://www.youtube.com/c/ShaneYoungCloud" },
            { name: "Power Apps Formula Reference Guide", url: "https://learn.microsoft.com/en-us/power-platform/power-fx/formula-reference" }
        ]
    },
    {
        id: 8,
        phase: 2,
        phaseName: "Power Platform & Automation",
        title: "Power Automate: Enterprise Cloud Flow Integrations",
        duration: "3.5 hours",
        description: "Understand automated, instant, and scheduled cloud flows. Dive deep into JSON parsing, data array operations, variables, looping conditions, and error-handling scopes.",
        resources: [
            { name: "Microsoft Learn: Build Automations Path", url: "https://learn.microsoft.com/en-us/training/paths/automate-process-using-flow/" },
            { name: "Reza Dorrani: Power Automate Expressions & Loops", url: "https://www.youtube.com/c/RezaDorrani" },
            { name: "Microsoft Docs: Cloud Flow Limits & Configurations", url: "https://learn.microsoft.com/en-us/power-automate/limits-and-config" }
        ]
    },
    {
        id: 9,
        phase: 2,
        phaseName: "Power Platform & Automation",
        title: "Dataverse Relational Models & Model-Driven Apps",
        duration: "3.0 hours",
        description: "Design relational database schemas directly in Microsoft Dataverse. Manage entity relationships (1:N, N:N), role-based security systems, and configure Model-Driven view grids.",
        resources: [
            { name: "Microsoft Learn: Get Started with Dataverse", url: "https://learn.microsoft.com/en-us/training/paths/work-power-apps-dataverse/" },
            { name: "Enterprise Security Roles in Dataverse Guide", url: "https://learn.microsoft.com/en-us/power-platform/admin/database-security" }
        ]
    },
    {
        id: 10,
        phase: 2,
        phaseName: "Power Platform & Automation",
        title: "Advanced API Integration & Custom Connectors",
        duration: "3.5 hours",
        description: "Connect Power Automate to legacy systems. Build custom OpenAPI connectors, handle OAuth2 authentications, and parse complex webhooks.",
        resources: [
            { name: "Microsoft Learn: Configure Custom Connectors", url: "https://learn.microsoft.com/en-us/training/modules/configure-custom-connectors/" },
            { name: "HTTP Action in Power Automate Guidelines", url: "https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference/web" }
        ]
    },

    // PHASE 3: Analytics & Process Mining
    {
        id: 11,
        phase: 3,
        phaseName: "Analytics & Process Mining",
        title: "SQL Data Modeling & Enterprise Queries",
        duration: "3.0 hours",
        description: "Learn robust database design. Master relational keys, index optimizations, joins, subqueries, and window functions to query operational databases.",
        resources: [
            { name: "Mode Analytics: Structured SQL Guide", url: "https://mode.com/sql-tutorial/" },
            { name: "Kaggle: Intro to SQL & BigQuery Analytics", url: "https://www.kaggle.com/learn/intro-to-sql" }
        ]
    },
    {
        id: 12,
        phase: 3,
        phaseName: "Analytics & Process Mining",
        title: "Business Intelligence Reporting (Power BI & Tableau)",
        duration: "4.0 hours",
        description: "Synthesize operational data. Master DAX expressions in Power BI, table calculations in Tableau, data modeling (Star schemas), and interactive visualization dashboards.",
        resources: [
            { name: "Microsoft Learn: Power BI Data Analyst Path", url: "https://learn.microsoft.com/en-us/training/paths/data-analytics-microsoft/" },
            { name: "Tableau: Visual Analytics Training Videos", url: "https://www.tableau.com/learn/training" },
            { name: "Storytelling with Data: Chart Design Principles", url: "https://www.storytellingwithdata.com/" }
        ]
    },
    {
        id: 13,
        phase: 3,
        phaseName: "Analytics & Process Mining",
        title: "Process Mining Foundations & Celonis Academy",
        duration: "3.5 hours",
        description: "Analyze event logs to discover hidden business bottlenecks automatically. Walk through Celonis process mining setups and Microsoft Power Automate Process Advisor.",
        resources: [
            { name: "Celonis Academy: Process Mining Basics", url: "https://academy.celonis.com/" },
            { name: "Microsoft Learn: Process Mining in Power Automate", url: "https://learn.microsoft.com/en-us/power-automate/process-mining-overview" }
        ]
    },
    {
        id: 14,
        phase: 3,
        phaseName: "Analytics & Process Mining",
        title: "Exploratory Data Analysis (EDA) & Hypothesis Testing",
        duration: "3.0 hours",
        description: "Apply statistics to process telemetry. Study normal distribution models, confidence intervals, A/B process test setups, and outliers identification.",
        resources: [
            { name: "Google Advanced Data Analytics Certificate (EDA)", url: "https://www.coursera.org/professional-certificates/google-advanced-data-analytics" },
            { name: "Khan Academy: Statistics and Probability Foundations", url: "https://www.khanacademy.org/math/statistics-probability" }
        ]
    },
    {
        id: 15,
        phase: 3,
        phaseName: "Analytics & Process Mining",
        title: "Operations Research & Capacity Modeling",
        duration: "3.5 hours",
        description: "Study optimization algorithms. Master queuing theory (M/M/1), linear programming solver methods, and modeling resource constraint limits.",
        resources: [
            { name: "MIT: Optimization Methods in Systems Dynamics", url: "https://ocw.mit.edu/courses/15-053-optimization-methods-in-management-science-spring-2013/" },
            { name: "Excel Solver: Optimization Modeling Guide", url: "https://www.solver.com/excel-solver-help" }
        ]
    },

    // PHASE 4: AI & Machine Learning in Operations
    {
        id: 16,
        phase: 4,
        phaseName: "AI & ML in Operations",
        title: "Enterprise AI & LLM Architectures",
        duration: "3.0 hours",
        description: "Learn to design scalable AI integrations. Understand prompts engineering, Retrieval-Augmented Generation (RAG) structures, token limits, and vector index search.",
        resources: [
            { name: "DeepLearning.AI: Prompt Engineering Course", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" },
            { name: "Cohere: LLM University Core Architectures", url: "https://cohere.com/llmu" }
        ]
    },
    {
        id: 17,
        phase: 4,
        phaseName: "AI & ML in Operations",
        title: "Microsoft Copilot Studio & AI Builder models",
        duration: "3.0 hours",
        description: "Deploy Copilot bots across SharePoint and Teams. Build structured AI document parsing extraction models (PDF data capture) and custom cognitive triggers.",
        resources: [
            { name: "Microsoft Learn: Configure Custom AI Bots", url: "https://learn.microsoft.com/en-us/training/paths/create-bots-copilot-studio/" },
            { name: "AI Builder Document OCR Processing Guide", url: "https://learn.microsoft.com/en-us/ai-builder/overview" }
        ]
    },
    {
        id: 18,
        phase: 4,
        phaseName: "AI & ML in Operations",
        title: "Python for Operational Automation Scripting",
        duration: "4.0 hours",
        description: "Write lightweight Python scripts to automate local files, Excel parsing, API requests, and web scraping using Pandas, Requests, and BeautifulSoup.",
        resources: [
            { name: "Al Sweigart: Automate the Boring Stuff with Python", url: "https://automatetheboringstuff.com/" },
            { name: "Wes McKinney: Pandas & Python Data Analysis", url: "https://wesmckinney.com/book/" }
        ]
    },
    {
        id: 19,
        phase: 4,
        phaseName: "AI & ML in Operations",
        title: "AI Agent Frameworks: LangChain & CrewAI",
        duration: "3.5 hours",
        description: "Study agent workflows. Learn how agents interact with external APIs, store execution histories, collaborate in multi-agent networks, and handle tool feedback loops.",
        resources: [
            { name: "LangChain Academy: Structural LLM Chains", url: "https://academy.langchain.com/" },
            { name: "CrewAI: Multi-Agent Orchestration Docs", url: "https://docs.crewai.com/" }
        ]
    },
    {
        id: 20,
        phase: 4,
        phaseName: "AI & ML in Operations",
        title: "AI Governance, Compliance, & EU AI Act Rules",
        duration: "2.0 hours",
        description: "Learn to design secure AI pipelines. Study EU AI Act classification systems, GDPR rules on data processing, and enterprise model audits.",
        resources: [
            { name: "Google: Responsibility & AI Governance Framework", url: "https://ai.google/responsibility/governance/" },
            { name: "EU AI Act Compliance & Risk Levels Summary", url: "https://www.euaiact.com/" }
        ]
    },

    // PHASE 5: Case Interview & Career Strategy
    {
        id: 21,
        phase: 5,
        phaseName: "Case Interview & Polish",
        title: "Case Interview Basics & Estimation Cases",
        duration: "3.0 hours",
        description: "Learn consulting math shortcuts, structured breakdown trees, and solving market-sizing or operational metrics questions for consultancies.",
        resources: [
            { name: "Case Interview Prep: Estimation Frameworks", url: "https://www.caseinterviewprep.org/" },
            { name: "Crafting Cases: Issue Tree Structures on YouTube", url: "https://www.youtube.com/c/CraftingCases" }
        ]
    },
    {
        id: 22,
        phase: 5,
        phaseName: "Case Interview & Polish",
        title: "Technology & Digital Transformation Case Studies",
        duration: "3.0 hours",
        description: "Deconstruct real-world enterprise case studies. Study cloud migrations, ERP upgrades, legacy data conversions, and digital transformation ROI metrics.",
        resources: [
            { name: "McKinsey Digital: Operational Case Insights", url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights" },
            { name: "BCG Henderson Institute: Case Library", url: "https://bcghendersoninstitute.com/" }
        ]
    },
    {
        id: 23,
        phase: 5,
        phaseName: "Case Interview & Polish",
        title: "Behavioral Fits & Systems consulting STAR Stories",
        duration: "2.5 hours",
        description: "Formulate behavioral interview answers using the STAR (Situation, Task, Action, Result) method. Structure highlights on leadership and system design.",
        resources: [
            { name: "The Muse: Complete STAR Method Interview Prep", url: "https://www.themuse.com/advice/star-method-behavioral-job-interview-questions" },
            { name: "Management Consulted: Fit Interviews Guide", url: "https://managementconsulted.com/" }
        ]
    },
    {
        id: 24,
        phase: 5,
        phaseName: "Case Interview & Polish",
        title: "Portfolio Architecture & Resume Alignment",
        duration: "2.0 hours",
        description: "Refine your system architect portfolio presentation. Structure your resume bullet points for strategy, process design, and automation metrics.",
        resources: [
            { name: "Victor Cheng: High-Impact Consulting Resumes", url: "https://www.caseinterview.com/consulting-resume" }
        ]
    },
    {
        id: 25,
        phase: 5,
        phaseName: "Case Interview & Polish",
        title: "Final Mock Simulations & Review",
        duration: "3.0 hours",
        description: "Run through final self-mock case scenarios. Record yourself explaining process automation solutions to ensure clean, structured communication.",
        resources: [
            { name: "Victor Cheng: Look Over My Shoulder (Mock Cases)", url: "https://www.caseinterview.com/loms" }
        ]
    }
];

// 2. STATE MANAGEMENT CLASS
class StudyStateManager {
    constructor() {
        this.storageKey = "study_flow_tracker_state";
        this.state = this.loadState();
    }

    loadState() {
        const defaultState = {
            completedSteps: [],
            notes: {},
            currentPhaseFilter: "all",
            searchQuery: "",
            theme: "light"
        };

        try {
            const raw = localStorage.getItem(this.storageKey);
            if (raw) {
                const parsed = JSON.parse(raw);
                return { ...defaultState, ...parsed };
            }
        } catch (e) {
            console.error("Error reading localStorage state:", e);
        }
        return defaultState;
    }

    saveState() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch (e) {
            console.error("Error writing localStorage state:", e);
        }
    }

    toggleStep(stepId) {
        const index = this.state.completedSteps.indexOf(stepId);
        if (index > -1) {
            this.state.completedSteps.splice(index, 1);
        } else {
            this.state.completedSteps.push(stepId);
        }
        this.saveState();
        return this.state.completedSteps.includes(stepId);
    }

    saveNote(stepId, noteText) {
        this.state.notes[stepId] = noteText;
        this.saveState();
    }

    getNote(stepId) {
        return this.state.notes[stepId] || "";
    }

    setPhaseFilter(filter) {
        this.state.currentPhaseFilter = filter;
        this.saveState();
    }

    setSearchQuery(query) {
        this.state.searchQuery = query;
        this.saveState();
    }

    setTheme(theme) {
        this.state.theme = theme;
        this.saveState();
    }

    exportJSON() {
        return btoa(unescape(encodeURIComponent(JSON.stringify(this.state))));
    }

    importJSON(base64String) {
        try {
            const decoded = decodeURIComponent(escape(atob(base64String)));
            const parsed = JSON.parse(decoded);
            if (parsed && Array.isArray(parsed.completedSteps) && typeof parsed.notes === "object") {
                this.state = {
                    completedSteps: parsed.completedSteps,
                    notes: parsed.notes,
                    currentPhaseFilter: parsed.currentPhaseFilter || "all",
                    searchQuery: parsed.searchQuery || "",
                    theme: parsed.theme || "light"
                };
                this.saveState();
                return true;
            }
        } catch (e) {
            console.error("Failed to parse imported state:", e);
        }
        return false;
    }

    resetAll() {
        this.state.completedSteps = [];
        this.state.notes = {};
        this.state.currentPhaseFilter = "all";
        this.state.searchQuery = "";
        this.saveState();
    }
}

// 3. UI RENDERING AND EVENTS
document.addEventListener("DOMContentLoaded", () => {
    const manager = new StudyStateManager();
    const htmlElement = document.documentElement;

    // Apply active theme
    htmlElement.setAttribute("data-theme", manager.state.theme);

    // Cache elements
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const countCompleted = document.getElementById("count-completed");
    const countTotal = document.getElementById("count-total");
    const currentRank = document.getElementById("current-rank");
    const flowContainer = document.getElementById("roadmap-flow-container");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("search-input");
    const themeToggle = document.getElementById("theme-toggle");
    const btnReset = document.getElementById("btn-reset");
    const btnExport = document.getElementById("btn-export");
    const btnImport = document.getElementById("btn-import");

    // Rank title thresholds
    const getRankTitle = (percentage) => {
        if (percentage === 100) return "Strategy & Systems Master 👑";
        if (percentage >= 80) return "Process & Systems Consultant";
        if (percentage >= 60) return "Operations Solution Architect";
        if (percentage >= 40) return "Enterprise Automation Engineer";
        if (percentage >= 20) return "Business Operations Analyst";
        return "Systems Apprentice";
    };

    // Calculate and update progress dashboard
    const updateDashboard = () => {
        const total = ROADMAP_DATA.length;
        const completed = manager.state.completedSteps.length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Animate progress bar width
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `${percent}%`;
        countCompleted.textContent = completed;
        countTotal.textContent = total;
        currentRank.textContent = getRankTitle(percent);
    };

    // Render step cards
    const renderCards = () => {
        flowContainer.innerHTML = "";
        const activeFilter = manager.state.currentPhaseFilter;
        const searchVal = manager.state.searchQuery.toLowerCase();

        // Filter the dataset
        const filteredData = ROADMAP_DATA.filter(item => {
            const matchesPhase = activeFilter === "all" || item.phase.toString() === activeFilter;
            const matchesSearch = item.title.toLowerCase().includes(searchVal) || 
                                  item.description.toLowerCase().includes(searchVal) ||
                                  item.phaseName.toLowerCase().includes(searchVal);
            return matchesPhase && matchesSearch;
        });

        if (filteredData.length === 0) {
            flowContainer.innerHTML = `
                <div class="empty-state">
                    <p>No study steps found matching your criteria.</p>
                </div>
            `;
            return;
        }

        filteredData.forEach(item => {
            const isCompleted = manager.state.completedSteps.includes(item.id);
            const savedNoteText = manager.getNote(item.id);
            
            // Build card container
            const card = document.createElement("div");
            card.className = `step-card ${isCompleted ? "completed" : ""}`;
            card.dataset.id = item.id;

            // Generate resources markup
            const resourcesMarkup = item.resources.map(res => `
                <a href="${res.url}" target="_blank" rel="noopener" class="resource-link">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    <span>${res.name}</span>
                </a>
            `).join("");

            card.innerHTML = `
                <div class="card-layout">
                    <!-- Left: Checkbox -->
                    <div class="card-check-col">
                        <button class="checkbox-btn" aria-label="Mark day ${item.id} complete">
                            <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                    </div>

                    <!-- Right: Content -->
                    <div class="card-main-col">
                        <div class="card-meta">
                            <span class="card-step-num">Step ${item.id}</span>
                            <span class="card-duration">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span>${item.duration}</span>
                            </span>
                            <span class="card-phase-tag">P${item.phase}: ${item.phaseName}</span>
                        </div>

                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-desc">${item.description}</p>

                        <!-- Resources Drawer -->
                        <div class="card-resources">
                            <span class="resource-label">Resources:</span>
                            <div class="resource-links-grid">
                                ${resourcesMarkup}
                            </div>
                        </div>

                        <!-- Notes Area -->
                        <div class="card-notes">
                            <div class="notes-header">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
                                <span>Study Notes (auto-saves):</span>
                            </div>
                            <textarea placeholder="Write definitions, code snippets, or ideas..." class="notes-input" data-step-id="${item.id}">${savedNoteText}</textarea>
                        </div>
                    </div>
                </div>
            `;

            // Checkbox event handler
            const checkboxBtn = card.querySelector(".checkbox-btn");
            checkboxBtn.addEventListener("click", () => {
                const done = manager.toggleStep(item.id);
                card.classList.toggle("completed", done);
                updateDashboard();
            });

            // Textarea auto-save handler (debounced-like / immediate saving on input)
            const textarea = card.querySelector(".notes-input");
            textarea.addEventListener("input", (e) => {
                manager.saveNote(item.id, e.target.value);
            });

            flowContainer.appendChild(card);
        });
    };

    // Filter Buttons logic
    filterButtons.forEach(btn => {
        // Highlight correct active filter button on load
        if (btn.dataset.phase === manager.state.currentPhaseFilter) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            manager.setPhaseFilter(btn.dataset.phase);
            renderCards();
        });
    });

    // Search input handler
    searchInput.addEventListener("input", (e) => {
        manager.setSearchQuery(e.target.value);
        renderCards();
    });

    // Theme toggle logic
    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        htmlElement.setAttribute("data-theme", newTheme);
        manager.setTheme(newTheme);
    });

    // Reset Progress logic
    btnReset.addEventListener("click", () => {
        const confirmReset = confirm("Are you sure you want to clear your study progress and notes? This cannot be undone.");
        if (confirmReset) {
            manager.resetAll();
            searchInput.value = "";
            filterButtons.forEach(b => b.classList.remove("active"));
            const btnAll = Array.from(filterButtons).find(b => b.dataset.phase === "all");
            if (btnAll) btnAll.classList.add("active");

            updateDashboard();
            renderCards();
        }
    });

    // Export Logic
    btnExport.addEventListener("click", () => {
        const token = manager.exportJSON();
        const exportArea = document.createElement("textarea");
        exportArea.value = token;
        document.body.appendChild(exportArea);
        exportArea.select();
        
        try {
            document.execCommand("copy");
            alert("Backup code copied to clipboard! Save it in a text file.");
        } catch (err) {
            prompt("Could not copy automatically. Copy this code instead:", token);
        } finally {
            document.body.removeChild(exportArea);
        }
    });

    // Import Logic
    btnImport.addEventListener("click", () => {
        const code = prompt("Paste your saved backup code here:");
        if (code) {
            const success = manager.importJSON(code.trim());
            if (success) {
                alert("Progress successfully imported!");
                // Reset search/filters visually to match imported state
                searchInput.value = manager.state.searchQuery;
                filterButtons.forEach(b => b.classList.remove("active"));
                const targetBtn = Array.from(filterButtons).find(b => b.dataset.phase === manager.state.currentPhaseFilter);
                if (targetBtn) targetBtn.classList.add("active");

                updateDashboard();
                renderCards();
            } else {
                alert("Invalid backup code. Please try again.");
            }
        }
    });

    // Initial load
    updateDashboard();
    renderCards();
});
