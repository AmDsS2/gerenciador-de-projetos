from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_add_data_criacao_field'),
    ]

    operations = [
        migrations.AddField(
            model_name='projeto',
            name='data_atualizacao',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ] 