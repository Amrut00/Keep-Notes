const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        date: "2024-10-16",
        username: "Gaming Guru | Strategy Enthusiast",
        content: "Finally mastered the hardest level in my favorite game—feeling invincible!"
    },
    {
        id: uuidv4(),
        date: "2024-10-15",
        username: "Crafty Karen | DIY Expert",
        content: "Made a hand-painted vase today—might just start a new hobby."
    },
    {
        id: uuidv4(),
        date: "2024-10-14",
        username: "Explorer Ethan | World Traveler",
        content: "Woke up in a new city today—adventure awaits!"
    },
    {
        id: uuidv4(),
        date: "2024-10-13",
        username: "Astronomy Adam | Star Gazer",
        content: "Spotted a meteor shower tonight—felt like the universe was putting on a show just for me."
    },
    {
        id: uuidv4(),
        date: "2024-10-12",
        username: "Startup Sarah | Entrepreneur",
        content: "Launched my new product today—feeling nervous but excited for what's to come."
    },
    {
        id: uuidv4(),
        date: "2024-10-11",
        username: "Nature Nancy | Environmental Advocate",
        content: "Picked up trash at the park today—small steps for a cleaner world!"
    },
    {
        id: uuidv4(),
        date: "2024-10-10",
        username: "Coffee Connoisseur | Brew Master",
        content: "Brewed the perfect cup of coffee this morning—it’s the little things that make the day."
    },
    {
        id: uuidv4(),
        date: "2024-10-09",
        username: "Techie Tim | Gadget Lover",
        content: "Just got the latest smartwatch—now I’m basically a cyborg."
    },
    {
        id: uuidv4(),
        date: "2024-10-08",
        username: "Yoga Yara | Peace Seeker",
        content: "Meditated for an hour today—feeling centered and ready to take on the world."
    },
    {
        id: uuidv4(),
        date: "2024-10-07",
        username: "Fitness Fiona | Gym Warrior",
        content: "Tried a new HIIT workout today—my muscles are already angry at me."
    },
    {
        id: uuidv4(),
        date: "2024-10-06",
        username: "Music Maker Max | Sound Explorer",
        content: "Made a new track today—getting closer to mastering the art of music production."
    },
    {
        id: uuidv4(),
        date: "2024-10-05",
        username: "Creative Carla | Art Enthusiast",
        content: "Finished a new painting today—my walls are starting to look like a gallery."
    },
    {
        id: uuidv4(),
        date: "2024-10-04",
        username: "Healthy Hannah | Wellness Advocate",
        content: "Tried a green smoothie today—might be converted to a full-time health freak."
    },
    {
        id: uuidv4(),
        date: "2024-10-03",
        username: "Digital Dave | Coding King",
        content: "Solved an algorithm challenge today—my brain's officially on fire."
    },
    {
        id: uuidv4(),
        date: "2024-10-02",
        username: "Cycling Cindy | Road Explorer",
        content: "Did a 50-mile ride today—my legs are questioning my life choices."
    },
    {
        id: uuidv4(),
        date: "2024-10-01",
        username: "Nature Nora | Forest Wanderer",
        content: "Went for a long hike today—felt like I was reconnecting with the earth."
    },
    {
        id: uuidv4(),
        date: "2024-09-30",
        username: "Creative Chris | DIY Wizard",
        content: "Made a wooden coffee table today—it’s wobbly, but it’s mine."
    },
    {
        id: uuidv4(),
        date: "2024-09-29",
        username: "Artisan Anna | Craft Queen",
        content: "Finished knitting a new scarf—who knew yarn could be so therapeutic?"
    },
    {
        id: uuidv4(),
        date: "2024-09-28",
        username: "History Henry | Past Explorer",
        content: "Visited an ancient castle today—made me wonder what stories those walls could tell."
    },
    {
        id: uuidv4(),
        date: "2024-09-27",
        username: "Coder Clara | Code Warrior",
        content: "Refined my code for a personal project—every little tweak makes a huge difference."
    },
    {
        id: uuidv4(),
        date: "2024-09-26",
        username: "Writer Willow | Storyteller",
        content: "Wrote 2,000 words today—feeling like my characters are starting to come to life."
    },
    {
        id: uuidv4(),
        date: "2024-09-25",
        username: "Baker Ben | Bread Maestro",
        content: "Baked a fresh loaf of sourdough—couldn’t wait for it to cool down before I started slicing."
    },
    {
        id: uuidv4(),
        date: "2024-09-24",
        username: "Runner Rachel | Marathon Enthusiast",
        content: "Ran 8 miles this morning—my feet hurt, but my heart feels light."
    },
    {
        id: uuidv4(),
        date: "2024-09-23",
        username: "Photographer Pete | Lens Lover",
        content: "Took some stunning shots of the sunset today—nature is the best model."
    }          
    
];

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req,res)=>{
    let {date,username,content} = req.body;
    let id = uuidv4();
    posts.unshift({id,date,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log("Listening to port", port);
});