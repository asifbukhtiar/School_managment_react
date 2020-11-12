import React from "react";
import { Constant } from "../constant";

function UploadImage(props){
    const [errorMsg, setErrorMsg] = React.useState("");
    const [imageBase64, setImageBase64] = React.useState("");
    const imageUpload = (e) => {

        let file = e.target.files[0];
        let orignalFileName = file ? file.name : "";
        let fileNameExt = orignalFileName && orignalFileName.substr(orignalFileName.lastIndexOf('.')).toLowerCase();
        if(fileNameExt && (fileNameExt == ".jpeg" || fileNameExt == ".jpg" || fileNameExt == ".png"))
        {
            if(file && (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png" || file.type == "image/gif")){

            if (file && file) {
                var reader = new FileReader();
                setErrorMsg("")
                props.callBack(file)
                reader.onload = function (e) {
                    setImageBase64(e.target.result)
                
                }
                reader.readAsDataURL(file);
            }
            }else{
                setErrorMsg("Please upload a PNG, GIF, or JPG image file format only")
            }
      }else{
            setErrorMsg("Please upload a PNG, GIF, or JPG image file format only")
        }
        
    }
    const imageRemove = () => {
        setImageBase64("");
        props.removeImage()
    }
    return(
                <div className="col-xs-12 col-sm-4">
                    <p htmlFor="image1">Upload Image</p>
                    <div className="upload-btn-wrapper">
                        <div className="image-holder">
                            <a href="javascript:void(0)">
                                <img src={imageBase64 == "" && !props.image_url ? require('../images/upload-image.png') : imageBase64 ? imageBase64 : Constant.apiURl + props.image_url} id='previewimage1' className="lazy" alt="Placeholder" />
                            </a>
                            {imageBase64 != "" || props.image_url != ""?
                                <a href="javascript:void(0)" onClick={imageRemove}>Remove</a>
                            :""                                    
                            }
                        </div>
                        {imageBase64 == "" && props.image_url == "" ?
                        <input type="file" name="myfile" onChange={(e) => imageUpload(e)} id='image1' accept=".png,.jpeg,.gif,.jpg" /> 
                        : ''
                        }
                    </div>
                    {errorMsg !="" ?
                        <div className="alert alert-danger">
                            {errorMsg}
                        </div>
                    :""}
                </div>

    )

}
export default UploadImage