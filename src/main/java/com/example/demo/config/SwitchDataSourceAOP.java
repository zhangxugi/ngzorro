package com.example.demo.config;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Order(0) // 在事务之前先执行
public class SwitchDataSourceAOP {

    @Before("execution(* com.example.demo.mapper.*.*(..))")
    public void process(JoinPoint joinPoint) {
        // 1.获取方法名称
        String methodName = joinPoint.getSignature().getName();
        // 2.判断方法名称前缀是否包含 查询名称 比如 select 、find、get等
        if (methodName.startsWith("select") || methodName.startsWith("find") || methodName.startsWith("get")) {
            // 设置为查询数据源
            System.out.println("主数据库");
            DynamicDataSourceHolder.setDbType("selectDataSource");
            return;
        }
        // 3. 否则情况 使用写的数据源
        System.out.println("从数据库");
        DynamicDataSourceHolder.setDbType("updateDataSource");
    }
}
