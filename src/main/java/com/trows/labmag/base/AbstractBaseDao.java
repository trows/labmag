package com.trows.labmag.base;



import com.trows.labmag.common.GetEntityClassUtil;
import com.trows.labmag.dao.Idao;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Throws_exception on 2015/5/29.
 */
public abstract class AbstractBaseDao <Entity, Key extends Serializable> implements BaseDao<Entity,Key>{
    Class entityClass = GetEntityClassUtil.getEntityClass(getClass());
    @Resource
    private Idao<Entity,Serializable> idao;

    public int insert(Entity entity, String operate) {
        return idao.insert(entity, operate);
    }

    public int update(Entity entity, String operate) {
        return idao.update(entity, operate);
    }

    public int updateByKey(Key key,String operate){
        return idao.updateByKey(entityClass,key,operate);
    }

    public int deleteByValue(Entity entity, String operate) {
        return idao.deleteByValue(entity, operate);
    }

    public int deleteByKey( Key key, String operate) {
        return idao.deleteByKey(entityClass,key,operate);
    }

    public int deleteByStr(String str,String operate){
        return idao.deleteByStr(entityClass,str,operate);
    }
    /**
     * ͨ获得一列实体
     *
     * @param key
     * @param operate
     * @return
     */
    public List<Entity> getListByKey( Key key, String operate) {
        return idao.getListByKey(entityClass, key, operate);
    }

    public List<Entity> getListByValue(Entity entity, String operate) {
        return idao.getListByValue(entity, operate);
    }
    public List<Entity> getListByStr(String str,String operate){
        return idao.getListByStr(entityClass, str, operate);
    }

    /**
     * 获得一个实体
     *
     * @param key
     * @param operate
     * @return
     */
    public Entity getEntityByKey( Key key, String operate) {
        return idao.getEntityByKey(entityClass, key, operate);
    }

    public Entity getEntityByValue(Entity entity, String operate) {
        return idao.getEntityByValue(entity, operate);
    }

    public Entity getEntityByStr(String str,String operate){
        return idao.getEntityByStr(entityClass, str, operate);
    }

    /**
     * 通过实体一参数获取主键
     * @param entity
     * @param operate
     * @return
     */
    public Integer getIntByValue(Entity entity,String operate){
        return idao.getIntByValue(entity, operate);
    }

    public Object getOneObjectByObject (Object obj,String operate){
        return idao.getOneObjectByObject(entityClass, obj, operate);
    }



    public List<Object> getObjectListByObject(Object obj,String operate){

        return idao.getObjectListByObject(obj,operate);
    }




}
