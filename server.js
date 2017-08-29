
function Room (roomName, password, owner, roomId) {
	this.name = roomName;
	this.password = password;
	this.owner = owner;
	this.id = roomId;
	this.people = function (newPerson) {
		var peopleList = [];
		peopleList.push(newPerson);
		return peopleList;
	};
}

// Require the packages we will use:
var http = require("http"),
socketio = require("socket.io"),
fs = require("fs");
// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html:
var app = http.createServer(function(req, resp){
// This callback runs when a new connection is made to our HTTP server.
    fs.readFile("client.html", function(err, data){
// This callback runs when the chat.html file has been read from the filesystem.
    if(err) return resp.writeHead(500);
    resp.writeHead(200);
    resp.end(data);
    });
});
app.listen(3456);
// var pm_users =[];
// var pm_messages = [];
// Do the Socket.IO magic:
var io = socketio.listen(app);

var roomList = [];
var roomId = 0;
var roomArray = [];

var io = socketio.listen(app);

io.sockets.on("connection", function (socket) {
    socket.on("createRoom", function (roomName, password, owner) {
		++roomId;
		io.sockets.emit("currentRoom", roomId);
		var newRoom = new Room(roomName, password, owner, roomId);
		roomArray.push(newRoom);
		roomList.push(newRoom.name);

		io.sockets.emit("updateRoomList", roomList, roomId);

		if (password != null) {
			io.sockets.emit("showOwner", newRoom.people(owner), "private", roomId);
		}else{
			io.sockets.emit("showOwner", newRoom.people(owner), "public", roomId);
		}
		
	});
    
    socket.on("loadRoomList", function () {
		io.sockets.emit("updateRoomList", roomList, roomId);
	});
    
    socket.on("checkPublicOrPrivate", function (roomId) {
		for (var i = 0; i < roomArray.length; i++) {
			if (roomArray[i].id == roomId) {
				if (roomArray[i].password == null) {
					io.sockets.emit("roomStatus", "public");
				}else{
					io.sockets.emit("roomStatus", "private");
				}
				break;
			}
		}
	});
    
    socket.on("loadPeopleList", function (nickname, roomId, roomStatus) {
		for (var i = 0; i < roomArray.length; i++) {
			if (roomArray[i].id == roomId) {
				if (roomStatus == "public") {
					io.sockets.emit("updatePeopleList", roomArray[i].people(nickname), "public", roomId);
				}else{
					io.sockets.emit("updatePeopleList", roomArray[i].people(nickname), "private", roomId);
				}
				break;
			}
		}
	});
    
    socket.on("checkPassword", function (password, roomId) {
		for (var i = 0; i < roomArray.length; i++) {
			if (roomArray[i].id == roomId) {
				if (roomArray[i].password == password) {
					io.sockets.emit("passwordFeedback", "correct");
				}else{
					io.sockets.emit("passwordFeedback", "wrong");
				}
				break;
			}
		}
	});
})