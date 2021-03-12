import { EntityRepository, Repository } from "typeorm";
import {UserModel} from "../models/UserModel";

@EntityRepository(UserModel)
class UserRepository extends Repository<UserModel>{}

export {UserRepository}