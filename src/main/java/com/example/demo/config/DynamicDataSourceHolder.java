package com.example.demo.config;

import org.springframework.stereotype.Component;

@Component
public class DynamicDataSourceHolder {
    // 采用ThreadLocal 保存本地多数据源
    private static final ThreadLocal<String> contextHolder = new ThreadLocal<>();

    // 设置数据源类型
    public static void setDbType(String dbType) {
        contextHolder.set(dbType);
    }

    public static String getDbType() {
        return contextHolder.get();
    }

    public static void clearDbType() {
        contextHolder.remove();
    }



}
