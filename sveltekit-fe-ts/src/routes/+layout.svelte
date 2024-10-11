<script>
	import '../app.css';
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">daisyUI</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Home</a></li>
			<li>
				<details>
					<summary>List</summary>
					<ul class="bg-base-100 rounded-t-none p-2">
						<li><a href="/">Home</a></li>
						<li><a href="/contact">Contact</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
</div>
<div class="container mx-auto">
	<slot></slot>
</div>
