const img = document.getElementById('profile_pic')
let info = document.getElementById("info");
const imagePreview = document.getElementById("preview");
const reader = new FileReader();
console.log('234')
img.addEventListener("change", (e) => {
    const imgDetails = document.querySelector("input[type=file]").files[0]; //***this is the main line which will give all info of image we selected
    if (imgDetails) {
        info.style.display = "block";
        document.querySelector(".img-name").innerText = imgDetails.name;
        document.querySelector(".img-type").innerText = imgDetails.type;
        document.querySelector(".img-size").innerText = imgDetails.size + "bytes";
        previewImage(imgDetails);
    } else {
        imagePreview.src = ""
        console.error("Please select a picture");
        info.style.display = "none";
    }
})
function previewImage(imgD) {
    const reader = new FileReader();

    // PREVIEW
    reader.addEventListener("load", function () {
        imagePreview.src = reader.result;
    })

    // CHECK IF THERE IS SELECTION 
    if (imgD) {
        // CHECK IF THE FILE IS AN IMAGE
        if (imgD.type === "image/jpeg" || imgD.type == "image/jpg" || imgD.type == "image/gif" || imgD.type == "image/png") {

            // CONVERTS FILE TO BASE 64
            reader.readAsDataURL(imgD);
        } else {
            imagePreview.src = "";
        }
    }
    // IF NO IMAGE
    else {
        imagePreview.src = ""
        errorMessage.innerText = "Please select a picture";
    }
}