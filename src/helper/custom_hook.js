import { useState, useEffect } from "react";
import { setPreloader } from "../features/Ui/uiSlice";
import { swal } from "./swal";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";


export const useModalHandler = () => {
  const [status, setStatus] = useState(false);
  const toggleModal = () => setStatus(!status);
  const [userProfile,setUserProfile] = useState();
  const genders = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "others", label: "others" },
  ];
  return {userProfile,setUserProfile,toggleModal,status,genders};
}

export const useWebCam = (setUserProfile=()=>{}) => {
  const [webcam, setWebcam] = useState(false);
  const toggleWebcam = () => setWebcam(!webcam);
  const setCapturedImageToInput = (file,fileInput) => {
    const dataURL = window.URL.createObjectURL(file);
    setUserProfile(dataURL)
    // var fileInput = document.getElementById('avatarInput');
    fetch(dataURL).then(response => response.blob()).then(blob => {
            var newFile = new File([blob], 'file.png', { type: 'image/png' });
            var fileList = new DataTransfer();
            fileList.items.add(newFile);
            fileInput.files = fileList.files;
        });
  }
  return {webcam,setWebcam,toggleWebcam,setCapturedImageToInput};
}

export const usePageInitialtor = (apiCallerObject) =>{
  const [tableData,setTableData] = useState([]);
  const [tableLoading,setTableLoading] = useState(true);
  const [webcam, setWebcam] = useState(false);
  const toggleWebcam = () => setWebcam(!webcam);
 
  useEffect(()=>{
    apiCallerObject.list().then(r=>{
      setTableData(r.data[Object.keys(r.data)[0]]);
      setTableLoading(false);
    }).catch(err=>swal.error(err.response?err.response.data.message:err.message))
  },[]);

  const setCapturedImageToInput = (file,fileInput,setUserProfile) => {
    const dataURL = window.URL.createObjectURL(file);
    setUserProfile(dataURL)
    fetch(dataURL).then(response => response.blob()).then(blob => {
            var newFile = new File([blob], 'file.png', { type: 'image/png' });
            var fileList = new DataTransfer();
            fileList.items.add(newFile);
            fileInput.files = fileList.files;
        });
  }
  const cameraHandler = {webcam,setWebcam,toggleWebcam,setCapturedImageToInput};
  const apiHandler = useHandleApiCall(tableData,setTableData,setTableLoading,apiCallerObject);

  return {webcam,toggleWebcam,tableData,setTableData,tableLoading,setTableLoading,apiHandler,cameraHandler};
}
 
export const useHandleApiCall = (tableData, setTableData,setTableLoading = ()=>{},apiCallerObject) => {
  const dispatch = useDispatch();
  const handleUpdate = (e,apiHandler,success=(x)=>{},fail=(x)=>{}) =>{
    e.preventDefault();
    setTableLoading(true);
    dispatch(setPreloader({ loader: true, message: "Please wait ..." }));
    const formData = new FormData(e.target);
    apiHandler(formData)
      .then((res) => {
        setTableData(tableData.map(td => td.id === res.data[Object.keys(res.data)[0]].id ? res.data[Object.keys(res.data)[0]] : td))
        success(res);
        swal.success(res.data.message);
      })
      .catch((err) => swal.error(err.response ? err.response.data.message : err.message))
      .finally(()=>{
        dispatch(setPreloader({ loader: false, message: "" }));
        setTableLoading(false);
      });
  }
  const handleSubmit = (e, apiHandler,success=(x)=>{},fail=(x)=>{}) => {
    e.preventDefault();
    setTableLoading(true);
    dispatch(setPreloader({ loader: true, message: "Please wait ..." }));
    const formData = new FormData(e.target);
    apiHandler(formData)
      .then((res) => {
        setTableData([res.data[Object.keys(res.data)[0]], ...tableData]);
        dispatch(setPreloader({ loader: false, message: "" }));
        success(res);
        swal.success(res.data.message);
      })
      .catch((err) =>swal.error(err.response ? err.response.data.message : err.message))
      .finally(()=>{
        dispatch(setPreloader({ loader: false, message: "" }));
        setTableLoading(false);
      });
  };
  const handleDelete = (data,success=(x)=>{},fail=(x)=>{}) =>{
      Swal.fire({
          title: "Are you sure ?",
          text:" You want to delete : "+ data.name,
          icon:'warning',
          showDenyButton: true,
          confirmButtonText: "Delete",
          denyButtonText: `No`
      }).then((result)=>{
          if (result.isConfirmed) {
              setTableLoading(false);
              dispatch(setPreloader({loader:true,message:'Deleting please wait ...'}))
              apiCallerObject.delete(data.id)
              .then(res=>{
                  setTableData([...tableData.filter(td=>td.id!=data.id)])
                  dispatch(setPreloader({loader:false,message:""}))
                  swal.success(res.data.message);
              })
              .catch((err) =>swal.error(err.response ? err.response.data.message : err.message))
              .finally(()=>{
                dispatch(setPreloader({ loader: false, message: "" }));
                setTableLoading(false);
              });
          }
      })
  }
  return {handleSubmit,handleDelete,handleUpdate};
};
