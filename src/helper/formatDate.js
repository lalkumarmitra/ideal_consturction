export const formatDate = (inputDate) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
};
export const formatDateYMD = (inputDate) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-CA', options);
    return formattedDate;
};


export const isDate1BeforeOrEqual=(dateString1, dateString2)=> {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
  
    return  date2 <= date1;
  }

export const timeFormat=(inputTime)=>{
    const fixedDate = new Date(`2000-01-01T${inputTime}`);
    const hours = fixedDate.getHours();
    const minutes = fixedDate.getMinutes();
    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? 'AM' : 'PM';
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
}


