module.exports = {

	generateString() {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for( let i =0; i < 6; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	},

	generateNumber(){
		let text = '';
		const possible = '0123456789';

		for( let i =0; i < 6; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
}