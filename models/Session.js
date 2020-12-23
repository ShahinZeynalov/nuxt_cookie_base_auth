import { Model } from '@vuex-orm/core'


export default class Session extends Model {
    static entity = 'sessions'

    static fields() {
        return {
            id: this.uid(),
            sessionKey: this.attr(''),
        }
    }
}