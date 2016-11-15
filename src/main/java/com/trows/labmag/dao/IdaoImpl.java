package com.trows.labmag.dao;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Throws_exception on 2015/5/29.
 */
@Service
public class IdaoImpl<Entity, Key extends Serializable> extends SqlSessionDaoSupport implements Idao<Entity, Key> {
    public int insert(Entity entity, String operate) {
        return getSqlSession().insert(entity.getClass().getName() + "." + operate, entity);
    }

    public int update(Entity entity, String operate) {
        return getSqlSession().update(entity.getClass().getName() + "." + operate, entity);
    }

    public int updateByKey(Class<Entity> entityClass, Key key, String operate) {
        return getSqlSession().update(entityClass.getName() + "." + operate, key);
    }

    public int deleteByValue(Entity entity, String operate) {
        return getSqlSession().delete(entity.getClass().getName() + "." + operate, entity);
    }

    public int deleteByKey(Class<Entity> entityClass, Key key, String operate) {
        return getSqlSession().delete(entityClass.getName() + "." + operate, key);
    }

    public int deleteByStr(Class<Entity> entityClass, String str, String operate){
        return getSqlSession().delete(entityClass.getName()+"."+operate,str);
    }

    /**
     * 获得一列实体
     *
     * @param entityClass
     * @param key
     * @param operate
     * @return
     */
    public List<Entity> getListByKey(Class<Entity> entityClass, Key key, String operate) {
        return getSqlSession().selectList(entityClass.getName() + "." + operate, key);
    }

    public List<Entity> getListByValue(Entity entity, String operate) {
        return getSqlSession().selectList(entity.getClass().getName() + "." + operate, entity);
    }

    public List<Entity> getListByStr(Class<Entity> entityClass, String str, String operate) {
        return getSqlSession().selectList(entityClass.getName() + "." + operate, str);
    }

    /**
     * 获得一个实体
     *
     * @param entityClass
     * @param key
     * @param operate
     * @return
     */
    public Entity getEntityByKey(Class<Entity> entityClass, Key key, String operate) {
        return getSqlSession().selectOne(entityClass.getName() + "." + operate, key);

    }

    public Entity getEntityByValue(Entity entity, String operate) {
        return getSqlSession().selectOne(entity.getClass().getName() + "." + operate, entity);
    }

    public Entity getEntityByStr(Class<Entity> entityClass, String str, String operate) {
        return getSqlSession().selectOne(entityClass.getName() + "." + operate, str);
    }

    public Integer getIntByValue(Entity entity, String operate) {
        return getSqlSession().selectOne(entity.getClass().getName() + "." + operate, entity);
    }

    public Object getOneObjectByObject(Class<Entity> entityClass, Object obj, String operate) {
        return getSqlSession().selectOne(entityClass.getName() + "." + operate, obj);
    }

    /**
     * 此方法需要完整映射名
     *
     * @param obj
     * @param operate
     * @return
     */
    public List<Object> getObjectListByObject(Object obj, String operate) {
        return getSqlSession().selectList(operate, obj);
    }


}
