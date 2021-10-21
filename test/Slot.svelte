<svelte:options tag={null}/>
<script>
	import Pesquisa from '../src/Pesquisa.svelte'

	const query = '{consulta(cep: "${this.value}") {cidade, end}}'
</script>

<Pesquisa
	endpoint="https://service.com.br/cep/v1/gql"
	title="btn"
	{query}
>
	<input type="text" title="q" name="q" value="04080000">
</Pesquisa>
