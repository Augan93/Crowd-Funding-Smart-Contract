import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xC20a1B501007c0CAA878e550f1936E426f05D268'
);

export default instance;
