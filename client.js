var nickname = null;

function login () {
	var id = document.getElementById("nickname").value;
	if (id) {
		$('#login').hide();
		nickname = id;

	}
}

document.getElementById("loginSubmit").addEventListener("click", login, false);

var socketio = io.connect();

socketio.on("updateRoomList", function (roomList) {
	$('#chatRoomList').empty();
	for (var i = 0; i < roomList.length; i++) {
		var display = document.getElementById("chatRoomList");
		display.innerHTML += '<a href="javascript:void(0)">' + roomList[i] + '</a>';
		display.innerHTML += '<br/>';
	}
	
});

function createRoom () {
	$('#publicOrPrivateRoom').show();
}

document.getElementById("createRoom").addEventListener("click", createRoom, false);

function publicRoom () {
	$('#publicOrPrivateRoom').hide();
	$('#publicRoom').show();

	var publicRoomName = document.getElementById("publicRoomName").value;
	var password = null;
	var owner = nickname;

	socketio.emit("createRoom", publicRoomName, password, owner);
}

function privateRoom () {
	$('#publicOrPrivateRoom').hide();
	$('#privateRoom').show();

	var privateRoomName = document.getElementById("privateRoomName").value;
	var password = document.getElementById("password").value;
	var owner = nickname;

	socketio.emit("createRoom", privateRoomName, password, owner);
}

document.getElementById("choosePublic").addEventListener("click", publicRoom, false);
document.getElementById("choosePrivate").addEventListener("click", privateRoom, false);