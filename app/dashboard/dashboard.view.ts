namespace $.$$ {

	export class $hyoo_speculant_app_dashboard extends $.$hyoo_speculant_app_dashboard {
		
		@ $mol_mem
		currency_names() {
			return Object.keys( this.model().indicators() ).filter( key => key !== 'CSH' )
		}
		
		@ $mol_mem
		day_start() {
			return new this.$.$mol_time_moment
		}
		
		@ $mol_mem
		days() {
			const history_length = this.indicator( this.currency_names()[0] ).history.length
			const arr = new Array( history_length ).fill( '' )
			return arr.map( ( _ , index ) => this.day_start().shift( { day: index } ).toString( 'MM-DD' ) )
		}

		@ $mol_mem_key
		indicator( id : string ) {
			return this.model().indicators()[ id ] as $hyoo_speculant_world_indicator
		}

		@ $mol_mem_key
		linear_title( id : string ) {
			return this.indicator( id ).name
		}	
		
		@ $mol_mem_key
		linear_series( id : string ) {
			return this.indicator( id ).history
		}
		
		@ $mol_mem
		linear_list() {
			return [
				... this.currency_names().map( id => this.Linear( id ) ) ,
				... super.linear_list() ,

			]
		}
		
		@ $mol_mem
		buy_buttons() {
			return this.currency_names().map( id => this.Buy_button( id ) )
		}
		
		@ $mol_mem
		sell_buttons() {
			return this.currency_names().map( id => this.Sell_button( id ) )
		}
		
		buy( id : $hyoo_speculant_world_indicator_codes ) {
			this.model().exchange( id , 1 )
		}
		
		sell( id : $hyoo_speculant_world_indicator_codes ) {
			this.model().exchange( id , -1 )
		}

	}

}