"use client";

import { useState, useRef, useEffect } from "react";
import { ChefHat, X, Send } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE BASE — every Q maps to its exact A from the module documents
// ─────────────────────────────────────────────────────────────────────────────
const knowledgeBase: { keywords: string[]; answer: string }[] = [

    // ── MODULE 1: Classification of Salads ───────────────────────────────────

    {
        keywords: [
            "what is a salad", "what is the meaning of a salad",
            "what is the definition of a salad", "salad meaning",
            "definition of salad", "salad definition"
        ],
        answer: "A salad is a combination of vegetables, fruits, and other ingredients served with a dressing."
    },
    {
        keywords: [
            "what is the meaning of the french term mis en place",
            "what is the mis en place", "mis en place", "mise en place",
            "setting everything in place", "organizing ingredients before"
        ],
        answer: "It means \"setting everything in place.\" It refers to the process of organizing and preparing all materials and ingredients before you actually start the food preparation."
    },
    {
        keywords: [
            "classification of salads according to ingredients used",
            "classification of salad according to ingredients",
            "salads according to ingredients used",
            "salads ingredients used",
            "classification according to ingredients"
        ],
        answer: "Classification of Salads According to Ingredients Used:\n\n🥬 Green Salads\n🥕 Vegetables, Grain Legumes and Pasta Salads\n🥄 Bound Salads\n🍎 Fruit Salads\n🎨 Composed Salads\n🍮 Gelatin Salads"
    },
    {
        keywords: [
            "classification of salads according to their functions in the meal",
            "classification of salad according to their functions",
            "salads according to their functions in the meal",
            "salads functions", "classification according to function",
            "function in the meal"
        ],
        answer: "Classification of Salads According to their Functions in the Meal:\n\n🥗 Appetizer Salads\n🍽️ Accompaniment Salad\n🍽️ Side Dish Salad\n🥩 Main Course Salads\n🍋 Separate Course Salads\n🍰 Dessert Salads"
    },

    // Green Salad
    {
        keywords: [
            "what is a green salad", "what is the definition of green salad",
            "green salad meaning", "green salad definition"
        ],
        answer: "It is a salad made primarily of leafy vegetables like lettuce, spinach, or cabbage. They must be fresh, crisp, and well-drained."
    },
    {
        keywords: [
            "what are the primary ingredients for a green salad",
            "ingredients of green salad", "primary ingredients green salad",
            "what ingredients are in green salad"
        ],
        answer: "Fresh leafy greens like Romaine lettuce, iceberg lettuce, spinach, cabbage, or arugula."
    },

    // Vegetable Salad
    {
        keywords: [
            "what are vegetables grain legumes and pasta salads",
            "what are vegetable salads", "vegetables salad meaning",
            "vegetable salad definition", "grain legumes pasta salad"
        ],
        answer: "These are salads where the main ingredients are vegetables (other than leafy greens) or starchy items like macaroni, rice, or beans."
    },
    {
        keywords: [
            "what ingredients are used in vegetable salads instead of leafy greens",
            "ingredients used in vegetable salad", "vegetable salad ingredients"
        ],
        answer: "Starchy items like pasta (rotini, macaroni), grains (rice, quinoa), or legumes (beans, peas)."
    },
    {
        keywords: ["vegetables salad example", "example of vegetable salad"],
        answer: "Broccoli, cauliflower, or carrots."
    },

    // Bound Salad
    {
        keywords: [
            "what is a bound salad", "what is the definition of bound salad",
            "bound salad meaning", "bound salad definition"
        ],
        answer: "It is a mixture of ingredients (like tuna, chicken, or potato) held together or \"bound\" by a thick dressing, usually mayonnaise."
    },
    {
        keywords: [
            "what specific ingredients are used to bind these salads",
            "bound salad ingredients", "what binds bound salad",
            "bind salad", "binding ingredient"
        ],
        answer: "A heavy or thick dressing, most commonly mayonnaise, yogurt, or a boiled dressing."
    },

    // Fruit Salad
    {
        keywords: [
            "what is a fruit salad", "what is the definition of fruit salad",
            "fruit salad meaning", "fruit salad definition"
        ],
        answer: "A salad that uses various fruits as the main ingredients. These can be served as appetizers, side dishes, or desserts."
    },
    {
        keywords: [
            "what are the ingredients of fruit salad",
            "fruit salad ingredients", "ingredients of fruit salad"
        ],
        answer: "Various fruits like pineapples, apples, grapes, and bananas."
    },

    // Composed Salad
    {
        keywords: [
            "what is a composed salad", "what is the meaning of composed salad",
            "composed salad meaning", "composed salad definition"
        ],
        answer: "It is a salad where the ingredients are arranged attractively on a plate rather than being tossed or mixed together."
    },
    {
        keywords: [
            "what are the common ingredients of composed salad",
            "composed salad ingredients"
        ],
        answer: "Sliced grilled chicken, avocado, hard-boiled egg wedges, and bacon bits arranged in rows."
    },
    {
        keywords: ["composed salad example", "example of composed salad", "cobb salad"],
        answer: "A Cobb Salad is a famous composed salad."
    },
    {
        keywords: [
            "what is unique about the ingredients in a composed salad",
            "composed salad uniqueness", "unique about composed salad"
        ],
        answer: "The ingredients are layered or arranged artfully on a plate rather than being mixed."
    },

    // Gelatin Salad
    {
        keywords: [
            "what is a gelatin salad", "what is the definition of gelatin salad",
            "gelatin salad meaning", "gelatin salad definition", "jello salad"
        ],
        answer: "A salad made using flavored or unflavored gelatin, often mixed with fruits or vegetables. It is also commonly known as a \"Jello salad.\""
    },
    {
        keywords: [
            "what are the key ingredients of gelatin salads",
            "gelatin salad ingredients", "key ingredients gelatin salad"
        ],
        answer: "Sweetened gelatin mix (like Jell-O), fruit juices, and suspended items like canned fruits or nuts."
    },

    // Functions — Appetizer
    {
        keywords: [
            "what is an appetizer salad", "appetizer salad meaning",
            "definition of appetizer salad"
        ],
        answer: "Stimulates appetite with fresh, crisp ingredients, tangy flavorful dressing, and attractive appearance."
    },
    {
        keywords: [
            "what is the example of appetizer salad",
            "appetizer salad example", "example appetizer salad"
        ],
        answer: "Examples are cheese, ham, salami, shrimp, crabmeat."
    },
    {
        keywords: [
            "do appetizer salads include cooked vegetables",
            "cooked vegetables appetizer salad"
        ],
        answer: "Yes, crisp raw or lightly cooked vegetables may be added."
    },

    // Accompaniment Salad
    {
        keywords: [
            "what is an accompaniment salad", "accompaniment salad",
            "should accompaniment salads match the main dish"
        ],
        answer: "Accompaniment salad must balance and harmonize with the meal, like a side dish."
    },
    {
        keywords: [
            "are accompaniment salads side dishes",
            "is accompaniment salad a side dish"
        ],
        answer: "Yes."
    },
    {
        keywords: [
            "can potato salad be served with french fries",
            "potato salad french fries"
        ],
        answer: "No. Avoid serving potato salad with French fries or another starch."
    },
    {
        keywords: [
            "are sweet fruit salads always appropriate as accompaniment",
            "sweet fruit salads accompaniment"
        ],
        answer: "Sweet fruit salads are rarely suitable except with ham or pork."
    },
    {
        keywords: [
            "what should side dish salads be like",
            "side dish salad characteristics"
        ],
        answer: "Side dish salad should be light and flavorful."
    },
    {
        keywords: [
            "are vegetable salads good as side dishes",
            "vegetable salad side dish"
        ],
        answer: "Vegetable salads are ideal."
    },
    {
        keywords: [
            "can macaroni salad be a side dish",
            "macaroni salad side dish"
        ],
        answer: "Yes, macaroni or protein-rich salads (seafood, cheese) are less appropriate unless the main course is light."
    },

    // Main Course
    {
        keywords: [
            "main course salad ingredients",
            "ingredients of main course salad"
        ],
        answer: "Examples are meat, poultry, seafood, egg, and cheese."
    },
    {
        keywords: [
            "should main course salads contain protein",
            "main course salad protein"
        ],
        answer: "Yes, large enough to serve as a full meal with a substantial portion of protein."
    },
    {
        keywords: [
            "do main course salads need variety in flavors",
            "main course salad variety"
        ],
        answer: "Yes, it includes the variety of flavors and texture."
    },

    // Separate Course
    {
        keywords: [
            "what is the uniqueness of a separate course",
            "separate course salad uniqueness", "separate course unique"
        ],
        answer: "A separate course is very light and not filling."
    },
    {
        keywords: [
            "can sour cream or mayonnaise be used in separate course",
            "sour cream mayonnaise separate course"
        ],
        answer: "No, a separate course avoids heavy dressing like sour cream or mayonnaise."
    },
    {
        keywords: [
            "are separate course salads served before dessert",
            "when is separate course salad served"
        ],
        answer: "Yes, a separate course is served after the main course to cleanse the plate and refresh the appetite."
    },

    // Dessert Salad
    {
        keywords: [
            "what is a dessert salad", "what is the definition of dessert salad",
            "dessert salad meaning", "dessert salad definition"
        ],
        answer: "Dessert salads are usually sweeter and may contain items such as fruits, sweetened gelatin, nuts and cream."
    },

    // ── MODULE 2: Components of a Salad ─────────────────────────────────────

    {
        keywords: [
            "what is the base of a salad", "why are leafy greens used as a base",
            "is lettuce the most common salad base", "what happens if a salad has no base",
            "can the base be more than one type of green", "is the base the largest part of the salad",
            "salad base"
        ],
        answer: "The base is the foundation of the salad and is usually made of leafy greens like lettuce."
    },
    {
        keywords: [
            "what is the main role of the salad base", "does the base affect the salad shape",
            "why does the salad need structure", "is the base meant to hold the body ingredients",
            "does the base affect portion size", "role of salad base"
        ],
        answer: "The base gives structure, volume, and support to the other salad ingredients."
    },
    {
        keywords: [
            "what is the body of a salad", "which ingredients belong to the salad body",
            "is the body the main source of flavor", "can meat be part of the salad body",
            "are fruits allowed in the body of a salad", "is the body placed on top of the base",
            "salad body"
        ],
        answer: "The body is the main part of the salad and includes vegetables, fruits, meat, or seafood."
    },
    {
        keywords: [
            "why is the body important in a salad", "which part adds most of the nutrients",
            "does the body affect texture", "can the salad body be cooked",
            "is the body more important than the garnish", "importance of salad body"
        ],
        answer: "The body adds flavor, texture, and nutritional value to the salad."
    },
    {
        keywords: [
            "what is salad dressing", "why is dressing added to salad",
            "is dressing always liquid", "does dressing add moisture",
            "can salad be served without dressing", "is dressing mixed with the body",
            "what is dressing"
        ],
        answer: "The dressing is a liquid or semi-liquid mixture that adds flavor and moisture to the salad."
    },
    {
        keywords: [
            "what are common ingredients of dressing", "is oil used in salad dressing",
            "when should dressing be added", "can dressing be served on the side",
            "does timing affect salad quality", "dressing ingredients"
        ],
        answer: "Dressings are made from oil, vinegar, mayonnaise, or cream and are added before or during service."
    },
    {
        keywords: [
            "what is a garnish", "why is garnish added to salad",
            "is garnish mainly for appearance", "must garnish be edible",
            "is garnish the main ingredient", "what is garnish"
        ],
        answer: "The garnish is an edible decoration that improves the appearance of the salad."
    },
    {
        keywords: [
            "what does garnish add to a salad", "should garnish match the salad flavor",
            "can garnish overpower the salad", "is garnish optional",
            "should garnish be simple", "garnish purpose"
        ],
        answer: "Garnish adds visual appeal and should complement the other salad ingredients."
    },

    // ── MODULE 3: Types of Salad Dressing ───────────────────────────────────

    {
        keywords: [
            "why is it important to use less oil in making salad dressing",
            "why is it not necessary to use too much oil",
            "how to balance high acidity in creating oil and vinegar dressing",
            "why do we use less oil in creating oil and vinegar types of salad dressing",
            "should we use less or more oil", "less oil dressing"
        ],
        answer: "Using less oil makes the dressing tarter and to avoid the salad dressing to taste milder and oilier."
    },
    {
        keywords: [
            "what is an emulsified dressing", "is mayonnaise an emulsified dressing",
            "what makes emulsified dressings creamy", "are mayonnaise-based dressings thick",
            "is mayonnaise used as a base", "emulsified dressing"
        ],
        answer: "Emulsified dressings use mayonnaise as a base and are usually thick and creamy."
    },
    {
        keywords: [
            "what is the oil-to-vinegar ratio", "how much oil is used in vinaigrette",
            "can the ratio be changed", "what happens if more oil is added",
            "what happens if less oil is used", "oil to vinegar ratio",
            "vinaigrette ratio", "standard ratio"
        ],
        answer: "The standard oil-to-vinegar ratio for vinaigrette is 3 parts oil to 1 part vinegar, but it can be adjusted to taste."
    },
    {
        keywords: [
            "what type of emulsion is vinaigrette", "is vinaigrette permanent or temporary",
            "does vinaigrette contain oil", "does vinaigrette contain vinegar",
            "is vinaigrette an emulsion", "vinaigrette emulsion type",
            "what is vinaigrette"
        ],
        answer: "Vinaigrette is a temporary emulsion made from oil, vinegar, and seasonings."
    },

    // ── MODULE 4: Guidelines ─────────────────────────────────────────────────

    {
        keywords: [
            "why is neat and accurate cutting important",
            "when should vegetables be cut for salads",
            "how should vegetables be cooked for salads",
            "why must cooked vegetables be drained and chilled",
            "why should pasta and grains not be overcooked",
            "guidelines vegetables legumes grains pasta salads"
        ],
        answer: "These salads require neat cutting, proper cooking, thorough draining, chilling, and preparation close to serving time."
    },
    {
        keywords: [
            "why must ingredients be cooled before adding mayonnaise",
            "why should bound salads be kept chilled",
            "why are potatoes cooked whole before peeling",
            "why are crisp vegetables added to bound salads",
            "why should dressings be folded in gently",
            "guidelines bound salads"
        ],
        answer: "Bound salads must use cooled ingredients, be mixed gently with mayonnaise, kept chilled, and portioned properly."
    },
    {
        keywords: [
            "why should fruit salads be handled carefully",
            "why are some fruits dipped in acidic liquid",
            "why should vegetables be prepared before fruit salads",
            "why must canned fruits be well drained",
            "why are attractive fruit pieces placed on top",
            "guidelines fruit salads"
        ],
        answer: "Fruit salads should be handled gently, protected from discoloration, well drained, and arranged attractively."
    },
    {
        keywords: [
            "why are ingredients prepared separately in composed salads",
            "why should each ingredient be seasoned individually",
            "why are delicate ingredients added just before serving",
            "why is contrast important in composed salads",
            "why is proper plating important", "guidelines composed salads"
        ],
        answer: "Composed salads require separate preparation, proper seasoning, balanced flavors, and careful arrangement."
    },
    {
        keywords: [
            "why is the correct gelatin-to-liquid ratio important",
            "how is unflavored gelatin properly dissolved",
            "how is flavored gelatin properly dissolved",
            "why are raw pineapple and papaya not allowed",
            "why must fruits be drained before adding to gelatin",
            "why should gelatin salads be refrigerated",
            "guidelines gelatin salads"
        ],
        answer: "Gelatin salads require correct gelatin proportions, proper dissolving, drained ingredients, and correct setting methods."
    },

    // Factors — Balance
    {
        keywords: [
            "what is meant by balance in salad preparation",
            "why is it important to balance color in salads",
            "how does balancing texture improve a salad",
            "why should ingredients be arranged by shape and size",
            "how does flavor balance affect the overall salad",
            "balance in salad"
        ],
        answer: "Balance ensures salad ingredients are arranged by color, shape, texture, and flavor to enhance appearance."
    },

    // Harmony
    {
        keywords: [
            "what does harmony mean in salad preparation",
            "why should ingredients harmonize with each other",
            "how do herbs spices or sauces add harmony to salads",
            "why is unity between dressing and ingredients important",
            "how does harmony improve the overall appeal of a salad",
            "harmony in salad"
        ],
        answer: "Harmony means choosing ingredients that complement each other and the dressing for a unified taste and presentation."
    },

    // Color
    {
        keywords: [
            "why is color important in salad presentation",
            "how can different colored vegetables improve a salad",
            "why should you add shredded carrots beets or red cabbage",
            "how does color affect appetite",
            "can using only one color make a salad less appealing",
            "color in salad"
        ],
        answer: "Color adds eye appeal; combining different colored ingredients makes the salad visually attractive."
    },

    // Texture
    {
        keywords: [
            "why is texture important in salads",
            "how does contrast in texture improve the salad",
            "why pair crisp vegetables with meat or fish",
            "how does texture affect the eating experience",
            "can texture make a salad more visually appealing",
            "texture in salad"
        ],
        answer: "Texture creates contrast between ingredients, such as crisp vegetables and tender meat or fish, making the salad more appealing."
    },

    // Safety & Storage
    {
        keywords: [
            "why should green salads be plated on a cold plate",
            "why should salads not be plated more than 1-2 hours before serving",
            "when should dressing be added to green salads",
            "why should salads be refrigerated until serving",
            "what happens if salads are held too long before serving",
            "why should holding boxes have high humidity",
            "safety storage salad", "salad storage"
        ],
        answer: "Salads should be kept cold, plated close to serving time, and dressings added just before serving to maintain freshness and prevent wilting."
    },
    {
        keywords: [
            "why should salads be plated on cold plates",
            "why must salads be refrigerated before serving",
            "why should dressings be added immediately before serving",
            "why should salads not be held for a long period of time",
            "why is proper temperature control important in salad storage",
            "temperature control salad"
        ],
        answer: "Following safety and hygienic practices such as refrigeration, correct timing of dressing application, proper holding time, and temperature control helps prevent spoilage, maintain freshness, and ensure food safety."
    },

    // Hygiene
    {
        keywords: [
            "why is washing salad vegetables important before preparation",
            "why should hands be washed before and after handling food",
            "why must clean utensils and equipment be used",
            "why is removing damaged or bruised parts necessary",
            "why should food handlers observe proper personal hygiene",
            "hygiene preparing salads", "principles hygiene salad"
        ],
        answer: "Practicing proper hygiene such as washing vegetables, maintaining clean hands and utensils, removing damaged parts, and observing cleanliness helps prevent contamination and ensures safe and healthy salads."
    },

    // Washing Produce
    {
        keywords: [
            "why should fruits and vegetables be washed before use",
            "why is it important to use running water when washing produce",
            "why should bruised or damaged areas be removed",
            "why must firm produce be scrubbed properly",
            "why should washed produce be dried before use",
            "how to wash fruits and vegetables",
            "washing fruits vegetables", "wash produce"
        ],
        answer: "Proper washing of fruits and vegetables using clean running water, removing damaged parts, scrubbing firm produce, and drying them well helps remove dirt, bacteria, and contaminants, ensuring food safety and cleanliness."
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// QUICK QUESTIONS shown on first load
// ─────────────────────────────────────────────────────────────────────────────
const quickQuestions = [
    "What is a salad?",
    "Classification of salads according to ingredients used",
    "What are the 4 components of a salad?",
    "What is the oil-to-vinegar ratio?",
    "How to wash fruits and vegetables?",
];

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSE ENGINE
// ─────────────────────────────────────────────────────────────────────────────
const GREETING_RE = /\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/i;

const COMPONENTS_RE = /\b(4 components|four components|components of a salad|salad components|parts of a salad)\b/i;

function getBotResponse(userMessage: string): string {
    const lower = userMessage.toLowerCase().trim();

    // Greeting
    if (GREETING_RE.test(lower)) {
        return "Hello! 👨‍🍳 I'm your Salad Course Assistant. I can help you with:\n\n📚 Module 1 — Classification of Salad\n🥗 Module 2 — Components of a Salad\n🧴 Module 3 — Types of Salad Dressing\n✅ Module 4 — Guidelines in Preparing Salad\n\nWhat would you like to learn about?";
    }

    // Special: 4 components shortcut
    if (COMPONENTS_RE.test(lower)) {
        return "The 4 components of a salad are:\n\n🥬 Base — the leafy green foundation\n🥩 Body — the main ingredients (vegetables, meat, seafood, fruits)\n🍋 Dressing — liquid or semi-liquid that adds flavor and moisture\n🌿 Garnish — edible decoration that improves appearance\n\nAsk me about any one of these for more details!";
    }

    // Search knowledge base — check every keyword of every entry
    for (const entry of knowledgeBase) {
        for (const keyword of entry.keywords) {
            if (lower.includes(keyword.toLowerCase())) {
                return entry.answer;
            }
        }
    }

    // Fallback
    return "I'm not sure about that yet. Try asking about:\n\n• Salad classification (by ingredients or function)\n• Salad components (base, body, dressing, garnish)\n• Types of dressing (vinaigrette, emulsified, etc.)\n• Preparation guidelines or hygiene practices\n\nOr pick one of the quick questions below! 😊";
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! 👨‍🍳 I'm your Salad Course Assistant. I can help you with:\n\n📚 Module 1 — Classification of Salad\n🥗 Module 2 — Components of a Salad\n🧴 Module 3 — Types of Salad Dressing\n✅ Module 4 — Guidelines in Preparing Salad\n\nWhat would you like to learn about?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Listen for external open event
    useEffect(() => {
        const openChat = () => setIsOpen(true);
        window.addEventListener("open-chat", openChat);
        return () => window.removeEventListener("open-chat", openChat);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInputMessage("");
        setIsTyping(true);

        setTimeout(() => {
            const botMsg: Message = {
                id: Date.now() + 1,
                text: getBotResponse(text),
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 600 + Math.random() * 600);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputMessage);
        }
    };

    const showQuickQuestions = messages.length === 1 && !isTyping;

    return (
        <>
            {/* Floating button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-50"
                    aria-label="Open chat"
                >
                    <ChefHat className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                </button>
            )}

            {/* Chat window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-green-200">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold">Salad Course Bot</h3>
                                <p className="text-xs text-green-100">Your learning assistant</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                            aria-label="Close chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${msg.sender === "user"
                                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-br-sm"
                                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                                    <span className={`text-xs mt-1 block ${msg.sender === "user" ? "text-green-100" : "text-gray-400"}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                                    <div className="flex gap-1">
                                        {[0, 0.2, 0.4].map((delay, i) => (
                                            <div
                                                key={i}
                                                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                                                style={{ animationDelay: `${delay}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick questions */}
                        {showQuickQuestions && (
                            <div className="space-y-2 pt-1">
                                <p className="text-xs text-gray-500 text-center font-semibold">Quick questions:</p>
                                {quickQuestions.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => sendMessage(q)}
                                        className="w-full text-left px-3 py-2 bg-white border border-green-200 rounded-xl text-sm text-gray-700 hover:bg-green-50 hover:border-green-400 transition-all font-medium"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={e => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about salad preparation..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-black"
                            />
                            <button
                                onClick={() => sendMessage(inputMessage)}
                                disabled={!inputMessage.trim()}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-2.5 rounded-xl hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Send message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send</p>
                    </div>
                </div>
            )}
        </>
    );
}