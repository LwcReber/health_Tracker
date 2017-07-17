## health-Tracker
health-Tracker 是一个响应式的食物健康应用，用于查询和计算食物的卡路里数。使用 **gulp** 工具构建，使用框架 **backbone JS**，使用 **Nutritionix API** 查询对应的食物卡路里

## install
  1. 在项目根目录运行命令行
   ```bash
   $> cnpm install
   ```

  2. 成功安装后，在dist文件夹里面运行命令行（需要安装 `python 3.6` 版本），创建一个本地服务器
   ```bash
   $> python -m http.server 8080
   ```
  浏览器输入网址 `http://localhost:8080` ，即可看到项目网站，
  如果没有安装python您也可以在根目录运行命令行
  ```
  $> npm run server
  ```
  浏览器输入网址 `http://localhost:8080/dist/` 即可

  3. 如何修改项目代码
      1. 在项目根目录运行命令行
      ```bash
      $> npm run start
      ```
      修改src文件夹的代码即可

## 应用使用说明
  1. 在输入框输入食物名称后，按ENTER键或者点击Search按钮就可以查询，查询过程将出现 **加载显示器**，查询成功将返回该类食物的不同卡路里数

  2. 点击查询的食物列表中的食物后，将把食物添加到卡路里计算列表中同时查询的食物列表将消失，卡路里列表计算出已经选择的食物的卡路里总数

## 代码补充说明
食物  M: Food, V: FoodView,  C:FoodList    <br>

查询食物  V: AppView     <br>

选择其中一个食物  V: SeletedFoodView, C: SelcetedFoods <br>

卡路里计算列表 V: CalCaloriesView   <br>
