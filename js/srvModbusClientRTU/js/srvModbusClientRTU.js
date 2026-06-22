const ClassModbusBase_S = require('./../../srvModbusBase/js/srvModbusBase');

const CONNECTION_TIMEOUT = 5000;
const PRIMARY_BUS = 'modbusrtuBus';


BUS_NAMES_LIST = ['sysBus', PRIMARY_BUS, 'logBus'];
const PROXY = {dest: 'proxymodbusrtu', com: 'proxymodbusrtu-msg-get'};
const PROTOCOL = 'modbusrtu';
const THIS_NAME = 'modbusclientrtu';


class ModbusClientRTU extends ClassModbusBase_S {
    /**
     * @constructor
     * @description
     * Конструктор класса
     * @param {[ClassBus_S]} _busList - список шин, созданных в проекте
     */
    constructor({ _busList, _node }) {
        super({ _name: THIS_NAME, _busNameList: BUS_NAMES_LIST, _busList, _node, _type: 'RTU' });      
    }
    
    /**
     * @method
     * @description Обработчик события, запускает отправку сообщения по указанному сокету
     * @param {String} _topic       - топик сообщения 
     * @param {Object} _msg         - само сообщение
     */
    HandlerEvents_modbusclientrtu_send(_topic, _msg) {
        const [source_name] = _msg.arg[0];
        const chNum = _msg.arg[1];
        const [value] = _msg.value;
        const [val] = value.value;
       
        this.Modbus_client_send(source_name, chNum, val);
    }

    /**
     * @method
     * @description Инициализирует соединение с источниками
     */
    Connect() {
        let sourcesCount = 0;
        let tOut = setTimeout(() => {
            this.EmitEvents_logger_log({level: 'I', msg: `Connections done by modbusRTU!`, obj: this.SourcesState});
            this.Start();
        }, CONNECTION_TIMEOUT);
        Object.values(this.SourcesState)
            .filter(source => source.Protocol === PROTOCOL && !source.IsConnected && source.CheckProcess && source.Status === 'active')
            .forEach((source) => {
                this.Add_new_source(source,PROXY);
                sourcesCount++;
        });
        if (sourcesCount == 0) {
            clearTimeout(tOut);
            this.EmitEvents_logger_log({level: 'I', msg: `No unconnected sources found!`, obj: this.SourcesState});
        }
    }
}

module.exports = ModbusClientRTU;