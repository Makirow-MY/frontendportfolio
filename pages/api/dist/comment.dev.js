"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handle;

var _mongoose = require("@/lib/mongoose");

var _Comment = require("@/models/Comment");

function handle(req, res) {
  var method, _req$body, name, title, image, email, contentPera, parent, commentDoc, com;

  return regeneratorRuntime.async(function handle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _mongoose.mongooseConnect)());

        case 2:
          method = req.method;

          if (!(method === 'POST')) {
            _context.next = 25;
            break;
          }

          _context.prev = 4;
          _req$body = req.body, name = _req$body.name, title = _req$body.title, image = _req$body.image, email = _req$body.email, contentPera = _req$body.contentPera, parent = _req$body.parent;

          if (!parent) {
            _context.next = 14;
            break;
          }

          commentDoc = new _Comment.Comment({
            name: name,
            title: title,
            image: image || "https://ui-avatars.com/api/?name=".concat(name, "&background=random"),
            email: email,
            contentPera: contentPera,
            parent: parent
          });
          commentDoc.save();
          _context.next = 11;
          return regeneratorRuntime.awrap(_Comment.Comment.findByIdAndUpdate(parent, {
            $push: {
              children: commentDoc._id
            }
          }));

        case 11:
          commentDoc.save();
          _context.next = 16;
          break;

        case 14:
          commentDoc = new _Comment.Comment({
            name: name,
            title: title,
            image: image || "https://ui-avatars.com/api/?name=".concat(name, "&background=random"),
            email: email,
            contentPera: contentPera
          });
          commentDoc.save();

        case 16:
          return _context.abrupt("return", res.status(201).json(commentDoc));

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](4);
          console.error("Error creating comment", _context.t0);
          res.status(500).json({
            message: "Failed to create comment"
          });

        case 23:
          _context.next = 34;
          break;

        case 25:
          if (!(method === 'GET')) {
            _context.next = 32;
            break;
          }

          _context.next = 28;
          return regeneratorRuntime.awrap(_Comment.Comment.find());

        case 28:
          com = _context.sent;
          res.status(200).json(com);
          _context.next = 34;
          break;

        case 32:
          res.setHeader('Allow', ['POST']);
          res.status(405).end("Method ".concat(method, " is not allowed"));

        case 34:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 19]]);
}