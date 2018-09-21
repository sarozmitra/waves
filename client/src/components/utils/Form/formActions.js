

export const validate = (element, formdata = []) => {
  let error = [true, ''];

  if(element.validation.email){
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be valid Email': ''}`;
    error = !valid ? [valid, message] : error;
  }

  if(element.validation.confirm){
    const valid = element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? 'Password do not match': ''}`;
    error = !valid ? [valid, message] : error;
  }

  if(element.validation.required){
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field required': ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
}

export const update = (element, formdata, formName) => {
  const newFormData = {
    ...formdata
  }
  const newElement = {
    ...newFormData[element.id]
  }
  newElement.value = element.event.target.value;

  if(element.blur){
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormData[element.id] = newElement;

  return newFormData;

}

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for(let key in formdata){
    if(key !== 'confirmPassword'){
      dataToSubmit[key] = formdata[key].value;
    }    
  }

  return dataToSubmit;
}

export const isFormValid = (formdata, formName) =>{
  let formIsValid = true;

  for(let key in formdata){
    formIsValid = formdata[key].valid && formIsValid;
  }

  return formIsValid;
}

export const populateOptionFields = (formdata, arrayData=[], field) => {
  const newArray = [];
  const newFormdata = {...formdata};

  arrayData.forEach((item)=>{
    newArray.push({key:item._id, value:item.name});
  })

  newFormdata[field].config.options = newArray;
  return newFormdata

}


export const resetFields = (formdata, formName) => {  
  const newFormdata = {...formdata};

  for(let key in newFormdata){
    if(key === 'images'){
      newFormdata[key].value = [];
    } else {
      newFormdata[key].value = '';
    }
    
    newFormdata[key].valid = false;
    newFormdata[key].touched = false;
    newFormdata[key].validationMessage = '';
  }

  return newFormdata;

}

export const populateFields = (formData, fields) => {

  for(let key in formData){
      formData[key].value = fields[key];
      formData[key].valid = true;
      formData[key].touched = true;
      formData[key].validationMessage = ''
  }

  return formData;
}
