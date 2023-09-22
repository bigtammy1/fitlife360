from models import redis_storage


redis_storage.isAlive()
print(redis_storage.get('auth'))

"""
const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64String = reader.result;
    // do something with the base64-encoded string
  };
};

"""