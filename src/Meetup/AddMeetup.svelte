<script>
  import {createEventDispatcher} from 'svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Button from '../UI/Button.svelte'
  import Modal from '../UI/Modal.svelte'
  import {testEmail} from '../helpers/validity.js'


  let title = ''
  let subtitle = ''
  let address = ''
  let email = ''
  let description = ''
  let imageUrl = ''
  let dispatch = createEventDispatcher()
  let errors = false
  let titleValidity = true
  let subtitleValidity = true
  let addressValidity = true
  let emailValidity = true
  let descriptionValidity = true
  let imageUrlValidity = true

  function submitMeetup(){
    if(title.length && subtitle.length && address.length && email.length && description.length && imageUrl.length){
      dispatch("saveMeetup", {title, subtitle, address, email, description, imageUrl})
    }else{
      titleValidity = Boolean(title)
      subtitleValidity = Boolean(subtitle)
      addressValidity = Boolean(address)
      emailValidity = testEmail(email)
      descriptionValidity = Boolean(description)
      imageUrlValidity = Boolean(imageUrl)
    }
  }
$: console.log(emailValidity)
</script>
<style>

form {
  width: 30rem;
  max-width: 90%;
  margin: auto;
}
.errors{
  padding-top: 20px;
  width: 30rem;
  max-width: 90%;
  margin: auto;
  color: red;
}


</style>

<Modal title='Add Meatup.' on:cancel>
  <div>
  <form on:submit|preventDefault={submitMeetup}>
    <TextInput validity={titleValidity} type="title" id="title" label="Title" value={title} on:input={(e) => title = e.target.value}/>
    <TextInput validity={subtitleValidity} type="subtitle" id="subtitle" label="Subtitle" value={subtitle} on:input={(e) => subtitle = e.target.value}/>
    <TextInput validity={addressValidity} type="address" id="address" label="Address" value={address} on:input={(e) => address = e.target.value}/>
    <TextInput validity={imageUrlValidity} type="imageUrl" id="imageUrl" label="Image Url" value={imageUrl} on:input={(e) => imageUrl = e.target.value}/>
    <TextInput validity={emailValidity} type="text" id="email" label="Email" value={email} on:input={(e) => email = e.target.value}/>
    <TextInput validity={descriptionValidity} cType="textarea" rows="3" id="description" label="Description" value={description} on:input={(e) => description = e.target.value}/>
    <Button type="submit" caption="Save"/>
    <Button caption="Cancel" on:click={()=>dispatch("cancel")}/>

  </form>

  </div>
</Modal>
