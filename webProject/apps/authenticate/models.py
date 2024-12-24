from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.utils.safestring import mark_safe
from PIL import Image


class Profiles(models.Model):
    user = models.ForeignKey(User, verbose_name="user", on_delete=models.CASCADE)
    avatar = models.ImageField(
        null=True,
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])],
        default=None
    )
    display_name = models.CharField(max_length=128, verbose_name="Display name")
    info = models.TextField(max_length=512, verbose_name="Info", null=True, blank=True, default=True)

    def __str__(self):
        return f'{self.user.username}'
    
    @staticmethod
    def crop_center(pil_img, crop_width: int, crop_height: int) -> Image:
        img_width, img_height = pil_img.size
        return pil_img.crop(((img_width - crop_width) // 2,
                             (img_height - crop_height) // 2,
                             (img_width + crop_width) // 2,
                             (img_height + crop_height) // 2))

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.avatar:
            img = Image.open(self.avatar.path)

            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)

            img = self.crop_center(img, 120, 120)
            img.save(self.avatar.path)

    def avatar_url(self):
        if self.avatar:
            return mark_safe(f'<img src="{self.avatar.url}" style="width: 45px; height: 100%;">')
