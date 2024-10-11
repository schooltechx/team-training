<script lang="ts">
    import { env } from '$env/dynamic/public'
    const BASE_PATH=env.PUBLIC_BASE_PATH||""
    console.log("BASE_PATH="+BASE_PATH)
    import { onMount } from 'svelte';    
    let fruits: {id:number,name:string,color:string}[]=[]
    let selectedId=0,debug = "",fruitName="",fruitColor=""
    async function load(){
        const res = await fetch(BASE_PATH+"/api/fruits")
        fruits = await res.json()
    }
    async function create(){
        const res = await fetch(BASE_PATH+"/api/fruits",{
            "method":"POST",
            "headers":{"Content-Type": "application/json"},
            "body":JSON.stringify({name:fruitName,color:fruitColor})
        })
        load()
    }
    async function remove(){
      debug = "Delete "+selectedId
      selectedId = 0
    }
    async function update(){
        debug = "Update "+selectedId
    }
    function selectFruit(id:number){
        let f = fruits.find((e)=>e.id===id)
        if(f){
            selectedId=id
            fruitName=f.name
            fruitColor=f.color
            debug = "Select "+selectedId    
        }else{
            debug = id+" not found "+id
        }
    }
    onMount(async () => {load()});
</script>
<main>
    <input type="text" name="name" bind:value={fruitName} placeholder="name">
    <input type="text" name="color" bind:value={fruitColor} placeholder="color">
    <button class="btn" on:click={create} disabled={!fruitName||!fruitColor}>Create</button> 
    <button class="btn" on:click={update} disabled={!fruitName||!fruitColor||selectedId===0}>Update</button>
    <button class="btn" on:click={remove} disabled={selectedId===0}>Delete</button>
    <ul>
    {#each fruits as fruit}
        <li>
            <input type="radio" name="id" on:click={()=>selectFruit(fruit.id)}>
            {fruit.name} : {fruit.color} 
        </li>
    {/each}
    </ul>
    <div>{debug}</div>
</main>

