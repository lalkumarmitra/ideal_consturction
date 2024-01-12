import Swal from "sweetalert2";

export const swal = {
    success : (message='Done',title='Success') =>{
        Swal.fire({
            title: title,
            icon:'success',
            text: message,
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            showCloseButton: !0,
        })
    },
    error : (title='Error',message)=>{
        Swal.fire({
            title: title,
            icon:'error',
            text: message,
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            showCloseButton: !0,
        })
    },
    info : (title='Info',message)=>{
        Swal.fire({
            title: title,
            icon:'info',
            text: message,
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            showCloseButton: !0,
        })
    },
    warning : (title='Warning',message)=>{
        Swal.fire({
            title: title,
            icon:'warning',
            text: message,
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            showCloseButton: !0,
        })
    }
}