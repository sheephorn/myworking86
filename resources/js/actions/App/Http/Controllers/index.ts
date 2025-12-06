import UserController from './UserController'
import UserPrizeController from './UserPrizeController'
import PointController from './PointController'
import Settings from './Settings'

const Controllers = {
    UserController: Object.assign(UserController, UserController),
    UserPrizeController: Object.assign(UserPrizeController, UserPrizeController),
    PointController: Object.assign(PointController, PointController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers