
var button = document.querySelector("#add-name-btn");

var updateNameId = null;
var BASE_URL = "https://nameslist.herokuapp.com"

function deleteNameOnServer(nameId) {
	fetch(BASE_URL + "/names/" + nameId, {
		method: "DELETE"
	}).then(function (response) {
		loadNames();
	});
};

function editNameOnServer(nameId, data) {

	fetch(BASE_URL + "/names/" + nameId, {
		method: "PUT",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		loadNames();
	});
};

button.onclick = function () {
	//TODO: send the new name to the server
	//1. capture text from input field
	var fNameInput = document.querySelector("#f-name-input");
	var lNameInput = document.querySelector("#l-name-input");
	var nicknameInput = document.querySelector("#nickname-input");
	var genderInput = document.querySelector("#gender-input");
	var ageInput = document.querySelector("#age-input");
	var fName = fNameInput.value;
	var lName = lNameInput.value;
	var nickname = nicknameInput.value;
	var gender = genderInput.value;
	var age = ageInput.value;
	//2. encode the data (url encoded)
	var data = "fName=" + encodeURIComponent(fName);
	data += "&lName=" + encodeURIComponent(lName);
	data += "&nickname=" + encodeURIComponent(nickname);
	data += "&gender=" + encodeURIComponent(gender);
	data += "&age=" + encodeURIComponent(age);
	//3. fetch (POST): send data to server
	fetch(BASE_URL + "/names", {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		loadNames();
	});
};

function loadNames () {
	fetch(BASE_URL + "/names").then(function (response) {
			response.json().then(function (namesFromServer) {
			//data now ready: loop over names & add to DOM
			names = namesFromServer;
			var namesList = document.querySelector("#names-list");
			namesList.innerHTML = "";
			names.forEach(function (name){
				console.log(name);
				var listItem = document.createElement("li");
				//listItem.innerHTML = name;
				listItem.innerHTML = name.f_name + " " + name.l_name + " (" + name.nickname + "), " + name.gender + ", " + name.age;

				var nameEL = document.createElement("div");
				//nameEL.innerHTML = name.name;
				listItem.appendChild(nameEL);
				nameEL.classList.add("name");
				

				var deleteButton = document.createElement("button");
				deleteButton.innerHTML = "Delete";
				deleteButton.classList.add("edit-delete-update");
				deleteButton.onclick = function() {
					if (confirm("Are you sure you want to delete " + name.f_name + " " + name.l_name + "?")) {
						deleteNameOnServer(name.id);
					}
				};
				listItem.appendChild(deleteButton);

				var editButton =document.createElement("button");
				editButton.innerHTML = "Edit";
				editButton.classList.add("edit-delete-update");
				editButton.onclick = function() {
					var fNameP = document.createElement("p");
					fNameP.innerHTML = "First Name: ";
					var fNameEdit = document.createElement("input");
					fNameEdit.value = name.f_name;

					var lNameP = document.createElement("p");
					lNameP.innerHTML = "Last Name: ";
					var lNameEdit = document.createElement("input");
					lNameEdit.value = name.l_name;

					var nicknameP = document.createElement("p");
					nicknameP.innerHTML = "Nickname: ";
					var nicknameEdit = document.createElement("input");
					nicknameEdit.value = name.nickname;

					var genderP = document.createElement("p");
					genderP.innerHTML = "Gender: ";
					var genderEdit = document.createElement("input");
					genderEdit.value = name.gender;

					var ageP = document.createElement("p");
					ageP.innerHTML = "Age: ";
					var ageEdit = document.createElement("input");
					ageEdit.value = name.age;

					var fNameEL = document.createElement("div");
					fNameEL.appendChild(fNameP)
					fNameEL.appendChild(fNameEdit)
					listItem.appendChild(fNameEL);
					fNameEL.classList.add("edit");

					var lNameEL = document.createElement("div");
					lNameEL.appendChild(lNameP)
					lNameEL.appendChild(lNameEdit)
					listItem.appendChild(lNameEL);
					lNameEL.classList.add("edit");

					var nicknameEL = document.createElement("div");
					nicknameEL.appendChild(nicknameP)
					nicknameEL.appendChild(nicknameEdit)
					listItem.appendChild(nicknameEL);
					nicknameEL.classList.add("edit");

					var genderEL = document.createElement("div");
					genderEL.appendChild(genderP)
					genderEL.appendChild(genderEdit)
					listItem.appendChild(genderEL);
					genderEL.classList.add("edit");

					var ageEL = document.createElement("div");
					ageEL.appendChild(ageP)
					ageEL.appendChild(ageEdit)
					listItem.appendChild(ageEL);
					ageEL.classList.add("edit");

					var updateButton = document.createElement("button");
					updateButton.innerHTML = "Update";
					updateButton.classList.add("edit-delete-update");
					updateButton.onclick = function() {
						if (confirm("Are you sure you want to edit " + name.f_name + " " + name.l_name + "?")) {
							var fNameUpdate = fNameEdit.value;
							var lNameUpdate = lNameEdit.value;
							var nicknameUpdate = nicknameEdit.value;
							var genderUpdate = genderEdit.value;
							var ageUpdate = ageEdit.value;
							//2. encode the data (url encoded)
							var updateData = "fName=" + encodeURIComponent(fNameUpdate);
							updateData += "&lName=" + encodeURIComponent(lNameUpdate);
							updateData += "&nickname=" + encodeURIComponent(nicknameUpdate);
							updateData += "&gender=" + encodeURIComponent(genderUpdate);
							updateData += "&age=" + encodeURIComponent(ageUpdate);

							editNameOnServer(name.id, updateData);
						}
					};
					listItem.appendChild(updateButton);

					
				};
				listItem.appendChild(editButton);

				namesList.appendChild(listItem);
				});
			});

	});
}

loadNames()