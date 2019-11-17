<script>
import Header from "./UI/Header.svelte";
import MeetupGrid from "./Meetup/MeetupGrid.svelte";
import AddMeetup from "./Meetup/AddMeetup.svelte";
import TextInput from "./UI/TextInput.svelte";
import LoadingSpinner from "./UI/LoadingSpinner.svelte"
import Button from "./UI/Button.svelte";
import {MeetupStore, Meetups} from "./stores/meetups.js"
import Details from './Meetup/MeetupDetails.svelte'
import {onDestroy, onMount} from 'svelte'
import {tweened} from 'svelte/motion';


onMount(()=>{
  fetch("https://svelte-project-1.firebaseio.com/meetups.json").then(res =>{
    return res.json()
  }).then(data => {
    for(let key in data){
      data[key].id = key
    }
    if(data){
      setTimeout(()=>{
        Meetups.set(Object.values(data).reverse())
        loaded = true
      }, 1000)
    }else{
      loaded = true
    }
  })
})

let edit;
let meetups = []
let meetId = null
let editId = null
let page = "overview";
let loaded = false


let unsubscribe = Meetups.subscribe(data => {
  // if(filter === "active"){
  //   meetups = data.filter(meetup => meetup.isFavorite)
  // }else{

    meetups = data
  // }
})

onDestroy(()=>{
  unsubscribe()
})



function saveMeetup(event){
  let deets = event.detail
  if(deets.id){
    loaded = false
    fetch(`https://svelte-project-1.firebaseio.com/meetups/${deets.id}/.json`, {
      method: "PATCH",
      body: JSON.stringify({...deets}),
      headers:{"Content-Type": "application/json"}
    }).then(res => {
      if(!res.ok){
        throw new Error("Didn't edit properly...")
      }
      return res.json()
    }).then(data =>{
      MeetupStore.editMeetup({...data, id: deets.id})
      loaded = true
    }).catch(err => console.log(err))


  }else{
    fetch("https://svelte-project-1.firebaseio.com/meetups.json", {
      method: "POST",
      body: JSON.stringify({...deets, isFavorite: false}),
      headers:{"Content-Type": "application/json"}
    }).then(res => {
      if(!res.ok){
        throw new Error("Didn't add properly...")
      }
      return res.json()
    }).then(data =>{

      MeetupStore.addMeetup({...deets, id: data.name})
    }).catch(err => console.log(err))
  }


  // meetups = [newMeetup, ...meetups]
  page = "overview"
  editId = null
}

function deleteMeetup(event){
  let id = event.detail
  fetch(`https://svelte-project-1.firebaseio.com/meetups/${id}/.json`, {
    method: "DELETE",
  }).then(res => {
    if(!res.ok){
      throw new Error("didn't delete properly")
    }
    console.log(res)
    MeetupStore.deleteMeetup(id)
    page = "overview"
    editId = null

  }).catch(err => console.log("butts"))
}

function detailsPage(event){
  page = "details"
  meetId = event.detail
}






</script>

<style>
  main {
    margin-top: 5rem;
  }
  main button {
    /* align-items: center; */
    /* margin-bottom: 5rem; */
  }

  .active {
    background-color: lightgrey;
  }

  .spacer {
    padding-top: 100px;
  }

</style>

<main>
<Header/>

{#if page === "overview"}

  {#if loaded}
    <MeetupGrid on:add={()=>{page='edit'}} on:edit={(event)=>{page='edit'; editId = event.detail}} on:showDetails={detailsPage} meetups={meetups}/>
  {:else}
  <div class="spacer">
    <LoadingSpinner/>
  </div>
  {/if}

{:else if page === "edit"}

<AddMeetup id={editId} on:delete={deleteMeetup} on:cancel={()=>{page = "overview"}} on:saveMeetup={saveMeetup}/>

{:else if page === "details"}
  <Details on:close={()=>{page = "overview"}} id={meetId}/>
<!-- {:else if page === 'edit'}
  <AddMeetup on:delete={deleteMeetup} editMode="true" id={editId} on:cancel={()=>{page = "overview"}} on:saveMeetup={editMeetup}/> -->
{/if}
</main>
