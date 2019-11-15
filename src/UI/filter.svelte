<script>

import {createEventDispatcher} from 'svelte'

export let state = false

let dispatch = createEventDispatcher()

</script>


<style>
  div {
    font-size: 0px;
  }

  button {
    background: #aaaaaa;
    font: inherit;
    font-size: 11px;
    text-align: center;
    width: 9rem;
    cursor: pointer;
    border: 1px solid #aaaaaa;
    padding: 0.4rem .61rem;

  }

  button:focus {
    outline: none;
  }

  #first {
    border-radius: 5px 0 0 5px;
  }

  #second {
    border-radius: 0 5px 5px 0;
  }

  button:hover,
  button:active,
  .active {
    background: #cf0056;
    border-color: #cf0056;
    color: white;
  }

</style>



<div>
  <button type="button" id="first" class:active={state} on:click={()=> {dispatch("activate")}}>FAVORITES</button>
  <button type="button" id="second" class:active={!state} on:click={()=> {dispatch("disactivate")}}>ALL</button>
</div>
