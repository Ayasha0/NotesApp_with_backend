import express, {urlencoded} from "express";
// import path from "path";
const app = express();
import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

// parsers
app.use(express.json());
app.use(urlencoded({extended: true}));
app.set("view engine", "ejs"); //backend renders ejs pages
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	// fs.readdir('filename.txt', callback)
	fs.readdir("./files", (err, files) => {
		// console.log(files);
		res.render("index.ejs", {files: files});
	});
});

app.post("/create", (req, res) => {
	// console.log(req.body.title);

	// fs.writeFile('filename.txt', data, callback)
	fs.writeFile(
		`./files/${req.body.title.split(" ").join("")}.txt`,
		req.body.details,
		(err, files) => {
			res.redirect("/");
		}
	);
});

app.get("/file/:filename", (req, res) => {
	fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
		res.render("show.ejs", {
			filename: req.params.filename,
			filedata: filedata,
		});
	});
});

app.get("/edit/:filename", (req, res) => {
	res.render("edit.ejs", {
		filename: req.params.filename,
	});
});

app.post("/edit", (req, res) => {
	// fs.rename("oldFileName.txt", "newFileName.txt", callback)
	fs.rename(
		`./files/${req.body.previous}`,
		`./files/${req.body.new}`,
		(err) => {
			res.redirect("/");
		}
	);
});

app.listen(3000, () => {
	console.log("server started at port 3000");
});
