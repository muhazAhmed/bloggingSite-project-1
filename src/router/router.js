const express = require("express");
const router = express.Router();
const controlers = require("../controlers/controlers");
const middleWare = require("../middleWare/middleWare");
const authWare = require("../middleWare/auth");

router.get("/test-me", function (req, res) {
  res.send("Working fine");
});

router.post("/authors", controlers.createAuthorData);
router.post("/login", controlers.login);
router.post(
  "/blogs",
  authWare.Authentication,
  middleWare.checkAuthId,
  controlers.createBlogData
);
router.get("/blogs", authWare.Authentication, controlers.getBlogs);
router.put(
  "/blogs/:blogId",
  authWare.Authentication,
  middleWare.checkBlogId,
  authWare.Authorisation1,
  controlers.updateBlogs
);
router.delete(
  "/blogs/:blogId",
  authWare.Authentication,
  middleWare.checkBlogId,
  authWare.Authorisation1,
  controlers.deleteBlogById
);
router.delete(
  "/blogs",
  authWare.Authentication,
  authWare.Authorisation2,
  controlers.deleteBlog
);

module.exports = router;

// Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like this
// Return an HTTP status 200 if updated successfully with a body like this
// Also make sure in the response you return the updated blog document.
