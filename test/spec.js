/**
 * Karmacracy
 *
 *    Library test
 */

'use strict'

var assert = require('assert'),
Karmacracy = require('../lib/karmacracy-javascript-api'),
appKey     = 'k4rm4cracy.JSWr42per',
userName   = 'jorgecasar',
userKey    = 'ia7odp8fvdof',
nutId      = '140',
url        = 'http://karmacracy.com',
url_short  = 'http://kcy.me/nlr8';

describe('Basic library test', function() {
	it('create instance', function() {
		var kcy = new Karmacracy(appKey);
		assert.strictEqual(typeof kcy,'object');
	});
	it('default lang English', function() {
		var kcy = new Karmacracy(appKey);
		assert.strictEqual(kcy.lang,'en');
	});
	it('create instance in Spanish', function() {
		var kcy = new Karmacracy(appKey, 'es');
		assert.strictEqual(kcy.lang,'es');
	});
	it('create instance in lag not supported', function() {
		var kcy = new Karmacracy(appKey, 'fr');
		assert.strictEqual(kcy.lang,'en');
	});
	it('setLang', function() {
		var kcy = new Karmacracy(appKey);
		kcy.setLang('es');
		assert.strictEqual(kcy.lang,'es');
	});
	it('setUserName', function() {
		var kcy = new Karmacracy(appKey);
		assert.strictEqual(kcy.userName, undefined);
		kcy.setUserName(userName);
		assert.strictEqual(kcy.userName,userName);
	});
	it('setUserKey', function() {
		var kcy = new Karmacracy(appKey);
		assert.strictEqual(kcy.userKey, undefined);
		kcy.setUserKey(userKey);
		assert.strictEqual(kcy.userKey,userKey);
	});
	it('setUser', function() {
		var kcy = new Karmacracy(appKey);
		assert.strictEqual(kcy.userName, undefined);
		assert.strictEqual(kcy.userKey, undefined);
		kcy.setUser(userName, userKey);
		assert.strictEqual(kcy.userName,userName);
		assert.strictEqual(kcy.userKey,userKey);
	});
	it('ckeckKey', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUserName(userName);
		kcy.checkKey(
			{
				k: userKey
			},
			function(error, response){
				assert.strictEqual(response.ok, 0);
				done();
			}
		);
	});
	it('getUserInfo', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.getUserInfo(
			function(error, response){
				assert.strictEqual(response.username, userName);
				done();
			}
		);
	});
	it('getNuts', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.getNuts(
			function(error, response){
				assert.strictEqual(typeof response, 'object');
				assert.notEqual(response.length, 0);
				done();
			}
		);
	});
	it('getNut', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.getNut(
			{
				n: nutId
			},
			function(error, response){
				assert.strictEqual(typeof response, 'object');
				assert.strictEqual(response.id, nutId);
				done();
			}
		);
	});
	it('getNetworks', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.getNetworks(
			function(error, response){
				assert.strictEqual(response, null);
				done();
			}
		);
	});
	it('getRank', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.getRank(
			function(error, response){
				assert.strictEqual(typeof response, 'object');
				assert.strictEqual(response.length, 10);
				assert.strictEqual(response[0].kcyrank, '1');
				done();
			}
		);
	});
	it('getStatsEvolution', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.getStatsEvolution(
			function(error, response){
				assert.strictEqual(typeof response, 'object');
				assert.strictEqual(typeof response.links_evolution, 'object');
				assert.strictEqual(typeof response.koi_evolution, 'object');
				assert.strictEqual(typeof response.rank_evolution, 'object');
				assert.strictEqual(typeof response.clicks_evolution, 'object');
				assert.strictEqual(typeof response.virgin_vs_burned, 'object');
				assert.strictEqual(typeof response.kclicks, 'string');
				assert.strictEqual(typeof response.kcys, 'string');
				done();
			}
		);
	});
	it('getStatsRelevance', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.getStatsRelevance(
			function(error, response){
				assert.strictEqual(typeof response, 'object');
				assert.strictEqual(typeof response.hours, 'object');
				assert.strictEqual(typeof response.week, 'object');
				assert.strictEqual(typeof response.kclicks, 'string');
				assert.strictEqual(typeof response.kcys, 'string');
				assert.strictEqual(typeof response.koi, 'number');
				assert.strictEqual(typeof response.social, 'object');
				done();
			}
		);
	});
	it('shortLink', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.shortLink(
			{
				url: url
			},
			function(error, response){
				// user and password error.
				assert.strictEqual(response, null);
				// assert.strictEqual(response.long_url, url);
				// assert.strictEqual(typeof response.url, url_short);
				done();
			}
		);
	});
	it('getFirewords', function(done) {
		var kcy = new Karmacracy(appKey);
		kcy.setUser(userName, userKey);
		kcy.getFirewords(
			{
				num: 10
			},
			function(error, response){
				assert.strictEqual(typeof response, 'object');
				assert.strictEqual(response.length, 10);
				done();
			}
		);
	});
});
