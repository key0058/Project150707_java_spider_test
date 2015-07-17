function showDianying() {

    Bmob.initialize("8cd3d14a8aba3ed604857566054d9bde", "539a161c3836483ca1a4aa3e1623dc7c");
    //获取一行数据
	var GameScore = Bmob.Object.extend("Video");
    var query = new Bmob.Query(GameScore);
    query.get("edb0f52d6f", {
      success: function(object) {
        // The object was retrieved successfully.
        alert(object);
      },
      error: function(object, error) {
        alert("query object fail");
      }
    });
}