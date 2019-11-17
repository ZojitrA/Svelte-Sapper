<script>

  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";
  import {MeetupStore, Meetups} from '../stores/meetups.js'
  import {createEventDispatcher} from 'svelte'
  import {fade, fly} from 'svelte/transition'
  import {flip} from 'svelte/animate'

  export let title
  export let subtitle
  export let imageUrl
  export let description
  export let address
  export let email
  export let id
  export let isFavorite

  let loaded = true


  let dispatch = createEventDispatcher()


  function toggleFavorite(id){
    loaded = false
    fetch(`https://svelte-project-1.firebaseio.com/meetups/${id}/.json`, {
      method: "PATCH",
      body: JSON.stringify({isFavorite: !isFavorite}),
      headers: {"Content-Type": "application/json"}
    }).then(res => {
      if(!res.ok){
        throw new Error("Couldn't Favorite")
      }
      MeetupStore.toggleFavorite(id)
      loaded = true
    }).catch(err => console.log(err))
  }

</script>
<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }
  .contact{
    height: 4rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {

    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }


</style>

<article transition:fly={{x:0, y:200}} >
  <header>

    <h1>{title}
      {#if isFavorite}
      <Badge/>
      {/if}
      </h1>


    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
    <div class="image">
      <img src="{imageUrl}" alt="">
    </div>

    <div class="content">
      <p>{description}</p>
    </div>

  <footer>

    <Button ref="mailto:{email}" caption="Contact"/>

    <Button type="button" {isFavorite} mode="outline" caption={isFavorite ? "Unfavorite" : "favorite"} on:click={()=>{toggleFavorite(id)}}/>

    <Button type="button" caption="Show Detail" on:click={() => dispatch("showDetails", id)}/>
    <Button caption="Edit Meetup" on:click={()=> dispatch("edit", id)}/>
  </footer>



</article>
